import type { User } from "~/types/user";

export const useUsers = () => {
  const config = useRuntimeConfig();
  return useFetch<User[]>(`${config.public.apiBase}/api/users`);
};
