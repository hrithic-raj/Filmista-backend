import { Request, Response } from "express";

export const exampleHandler = (req: Request, res: Response) => {
  // res.json({ message: "Hello from the example route!" });
  res.send('Hello from the router!');
};