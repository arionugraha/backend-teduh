import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const user: IUser = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id, username: user.username }, SECRET_KEY);
    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
    }
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    const user: IUser | null = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid login credentials");
    }

    const token = jwt.sign({ _id: user._id, username: user.username }, SECRET_KEY);
    res.status(200).send({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
    }
  }
}
