import * as express from "express";

export function respondWithError500(ex: any, res: express.Response) {
	console.log(ex);
	res.status(500).json({ error: ex.toString() });
}
