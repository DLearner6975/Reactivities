import { z } from "zod";

const requiredString = (fieldName: string) =>
    z
        .string({ error: `${fieldName} is required` })
        .min(1, { error: `${fieldName} is required` });
const requiredDate = (fieldName: string) =>
    z.coerce
        .date({ error: `${fieldName} is required` })
        .min(new Date(), { error: `${fieldName} must be in the future` });

export const activitySchema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    category: requiredString("Category"),
    date: requiredDate("Date"),
    location: z.object({
        venue: requiredString("Venue"),
        city: z.string().optional(),
        latitude: z.coerce.number().min(-90).max(90),
        longitude: z.coerce.number().min(-180).max(180),
    }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
