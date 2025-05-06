import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";

import httpStatus from "http-status";
import AppError from "../Error/AppError";
import { jwtHelpers } from "../../helper/jwtHelpers";



const auth = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
          const token = req.headers.authorization

            if (!token) {
              throw new AppError(
                httpStatus.UNAUTHORIZED,
                "You are not authorized!"
              );
            }

            const verifiedUser = jwtHelpers.verifyToken(
              token,
              config.accesToken_secret as Secret
            ) as JwtPayload;

            if (roles.length && !roles.includes(verifiedUser.role)) {
              throw new AppError(httpStatus.FORBIDDEN, "Forbidden!");
            }


            req.user = verifiedUser as JwtPayload & { role: string };
            next()
        }
        catch (err) {
            next(err)
        }
    }
};

export default auth;