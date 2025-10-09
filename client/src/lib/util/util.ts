import { format, type DateArg } from "date-fns";

export const formatDate = (date: DateArg<Date>) => {
    return format(date, "dd MMM yyyy h:mm a");
};
