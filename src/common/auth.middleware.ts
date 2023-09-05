import { NextFunction, Request, Response } from "express";
import { IMiddleWare } from "./middleware.interface";
import { JwtPayload, verify } from "jsonwebtoken";

export class AuthMiddleware implements IMiddleWare {
	email: string;

	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(" ")[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					if (typeof payload === "object" && payload.email) {
						req.user = payload.email;
					}
					next();
				}
			});
		} else {
			next();
		}
	}
}
