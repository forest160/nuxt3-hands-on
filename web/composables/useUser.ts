import type { User } from "~/types/user";

export const useUser = (id: number) => {
  const config = useRuntimeConfig();

  return useFetch<User>(`${config.public.apiBase}/api/users/${id}`, {
    onResponseError({ response }) {
      if (response.status === 404) {
        throw createError({ statusCode: 404, statusMessage: "User Not Found" });
      }
    },
  });
};
