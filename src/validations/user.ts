import { z } from "zod";

export const createUserSchema = z.object({
    uid: z.string(),
    email: z.string().email(),
    role: z.enum([
        "showaUser",
        "showaAdmin",
        "showaSubAdmin",
        "serviceProviderAdmin",
        "serviceProviderSubAdmin",
        "serviceProviderEngineer",
        "serviceProviderBranchManager",
        "serviceProviderSupportStuff",
    ]),
    status: z.enum(["in-progress", "approved", "suspended"]),
    name: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }),
    phone: z.string(),
    occupation: z.string().optional(),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date",
    }),
    gender: z.enum(["male", "female", "prefer-not-answer"]),
    photoUrl: z.string().optional(),
    addresses: z
        .array(
            z.object({
                isDeleted: z.boolean(),
                address: z.object({
                    street: z.string(),
                    city: z.string(),
                    prefecture: z.string(),
                    postalCode: z.string(),
                    country: z.string(),
                    buildingName: z.string(),
                    roomNumber: z.string(),
                    state: z.string().optional(),
                    details: z.string().optional(),
                }),
            })
        )
        .optional(),
});
