import { z } from "zod";

const requiredString = (fieldName: string) =>
    z
        .string({ message: `${fieldName} is required` })
        .min(1, { message: `${fieldName} is required` });
const requiredDate = (fieldName: string) =>
    z
        .date({ message: `${fieldName} is required` })
        .min(new Date(), { message: `${fieldName} must be in the future` });

export const activitySchema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    category: requiredString("Category"),
    date: requiredDate("Date"),
    location: z.object({
        venue: requiredString("Venue"),
        city: z.string().optional(),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
    }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
