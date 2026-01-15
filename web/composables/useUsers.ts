import type { User } from "~/types/user";

export const useUsers = () => {
  return useFetch<User[]>(`/api/users`);
};
