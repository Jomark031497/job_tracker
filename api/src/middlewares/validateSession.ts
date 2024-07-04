import { NextFunction, Request, Response } from "express";
import { Session, User } from "lucia";
import { lucia } from "../lib/lucia";
import { AppError } from "../utils/AppError";

export const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (!user) throw new AppError(401, "Unauthorized");

  if (session && session.fresh) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  }
  if (!session) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }
  res.locals.user = user;
  res.locals.session = session;
  return next();
};

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
    }
  }
}
