import type { User } from "~/types/user";

export default defineEventHandler(async (): Promise<User[]> => {
  const config = useRuntimeConfig();
  return await $fetch<User[]>(`${config.apiBase}/api/users`);
});
