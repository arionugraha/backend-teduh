import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const port: String | number = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello my name is Jugram!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
