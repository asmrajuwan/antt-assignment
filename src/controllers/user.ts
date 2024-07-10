import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/user";
import { createUserSchema } from "../validations/user";

export const createUser = async (req: Request, res: Response) => {
    try {
        const validatedData = createUserSchema.parse(req.body);
        const user = new User(validatedData);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.errors });
        } else {
            res.status(500).json({ message: "Server Error", error });
        }
    }
};

export const getUsers = async (req: Request, res: Response) => {
    const { email, phone } = req.query;
    const query: any = {};

    if (email) {
        query.email = email;
    }

    if (phone) {
        query.phone = phone;
    }

    try {
        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
