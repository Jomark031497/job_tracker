import { Request, Response, NextFunction } from "express";
import { getAuthenticatedUser, loginUser, signUpUser } from "./auth.service.js";
import { lucia } from "../../lib/lucia.js";

export const authenticatedUserHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(401).json({ message: "unauthorized" });

    const authenticatedUser = await getAuthenticatedUser(user.id);

    return res.status(200).json(authenticatedUser);
  } catch (error) {
    return next(error);
  }
};

export const signUpUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await signUpUser(req.body);

    const session = await lucia.createSession(user.id, {});

    return res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).json(user);
  } catch (error) {
    return next(error);
  }
};

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await loginUser(req.body);

    const session = await lucia.createSession(user.id, {});

    return res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).json(user);
  } catch (error) {
    return next(error);
  }
};

export const logoutUserHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const session = res.locals.session;
    if (!session) return res.status(401).json({ message: "unauthorized" });

    await lucia.invalidateSession(session.id);

    return res
      .setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize())
      .status(200)
      .json({ message: "logout success", success: true });
  } catch (error) {
    return next(error);
  }
};
