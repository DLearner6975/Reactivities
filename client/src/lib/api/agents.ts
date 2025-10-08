import axios from "axios";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

agent.interceptors.response.use(async (response) => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log("🚀 ~ interceptors error:", error);
        return Promise.reject(error);
    }
});

// export const Activities = {
//     list: () =>
//         agent.get<Activity[]>("activities").then((response) => response.data),
//     details: (id: string) =>
//         agent
//             .get<Activity>(`activities/${id}`)
//             .then((response) => response.data),
//     create: (activity: Activity) =>
//         agent
//             .post<void>("activities", activity)
//             .then((response) => response.data),
//     update: (activity: Activity) =>
//         agent
//             .put<void>(`activities/${activity.id}`, activity)
//             .then((response) => response.data),
//     delete: (id: string) =>
//         agent
//             .delete<void>(`activities/${id}`)
//             .then((response) => response.data),
// };

// export const TestErrors = {
//     get400Error: () => agent.get<void>("buggy/bad-request"),
//     get401Error: () => agent.get<void>("buggy/unauthorized"),
//     get404Error: () => agent.get<void>("buggy/not-found"),
//     get500Error: () => agent.get<void>("buggy/server-error"),
//     getValidationError: () => agent.get<void>("buggy/validation-error"),
// };
export default agent;
