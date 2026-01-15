import type { User } from "~/types/user";

type CreateUserBody = { name: string };

export default defineEventHandler(async (event): Promise<User> => {
  const config = useRuntimeConfig();
  const body = await readBody<CreateUserBody>(event);

  return await $fetch<User>(`${config.apiBase}/api/users`, {
    method: "POST",
    body,
  });
});
