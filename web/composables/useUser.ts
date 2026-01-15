import type { User } from "~/types/user";
import { useFetch, createError } from "#app";

export const useUser = (id: number) => {
  return useFetch<User>(`/api/users/${id}`, {
    onResponseError({ response }) {
      if (response.status === 404) {
        throw createError({ statusCode: 404, statusMessage: "User Not Found" });
      }
    },
  });
};
