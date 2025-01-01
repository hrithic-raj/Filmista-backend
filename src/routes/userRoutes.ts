import express from 'express';
import { exampleHandler } from "../controllers/userControllers";

const router = express.Router()

router.get("/", (req, res)=>{
  res.send('Hello from the router!');
});

export default router;
