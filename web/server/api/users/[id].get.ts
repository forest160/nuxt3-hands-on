import type { User } from "~/types/user";

export default defineEventHandler(async (event): Promise<User> => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  return await $fetch(`${config.apiBase}/api/users/${id}`);
});
