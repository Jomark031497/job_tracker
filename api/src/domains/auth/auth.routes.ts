import { Router } from "express";
import {
  authenticatedUserHandler,
  loginUserHandler,
  logoutUserHandler,
  signUpUserHandler,
} from "./auth.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertUserSchema, selectUserSchema, users } from "../users/users.schema";
import { validateSession } from "../../middlewares/validateSession";
import { generateState, GitHub, OAuth2RequestError } from "arctic";
import { github, lucia } from "../../lib/lucia";
import { parseCookies, serializeCookie } from "oslo/cookie";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { AppError } from "../../utils/AppError";

const router = Router();

router.get("/user", validateSession, authenticatedUserHandler);

router.get("/github", async (req, res, next) => {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  return res
    .status(302)
    .appendHeader(
      "Set-Cookie",
      serializeCookie("github_oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        maxAge: 60 * 10,
        sameSite: "lax",
      })
    )
    .redirect(url.toString());
});

router.get("/github/callback", async (req, res, next) => {
  const code = req.query.code?.toString() ?? null;
  const state = req.query.state?.toString() ?? null;
  const storedState = parseCookies(req.headers.cookie ?? "").get("github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    console.log(code, state, storedState);
    res.status(400).end();
    return;
  }
  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser = (await githubUserResponse.json()) as GitHubUser;

    await db.select().from(users).where(eq(users.githubId, githubUser.id));

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.githubId, githubUser.id),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      return res
        .appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
        .redirect("/");
    }

    const newUser = await db
      .insert(users)
      .values({
        githubId: githubUser.id,
        username: githubUser.login,
      })
      .returning();

    if (!newUser[0]) throw new AppError(400, "user creation failed");
    const session = await lucia.createSession(newUser[0].id, {});

    return res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).json({
      username: newUser[0].username,
    });
    // const userId = generateId(15);
    // db.prepare("INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)").run(
    //   userId,
    //   githubUser.id,
    //   githubUser.login
    // );
    // const session = await lucia.createSession(userId, {});
    // return res
    //   .appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
    //   .redirect("/");
  } catch (e) {
    if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
      // invalid code
      res.status(400).end();
      return;
    }
    res.status(500).end();
    return;
  }
});

router.post("/sign-up", validateSchema(insertUserSchema), signUpUserHandler);

router.post(
  "/login",
  validateSchema(
    selectUserSchema.pick({
      username: true,
      password: true,
    })
  ),
  loginUserHandler
);

router.delete("/logout", validateSession, logoutUserHandler);

export default router;

interface GitHubUser {
  id: number;
  login: string;
}
