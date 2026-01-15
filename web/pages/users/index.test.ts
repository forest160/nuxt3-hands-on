import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import UsersPage from "./index.vue";

let db: { id: number; name: string }[] = [];

beforeEach(() => {
  db = [{ id: 1, name: "Alice" }];

  // Nuxt/ ofetch が参照する $fetch を直にモック（これが安定）
  vi.stubGlobal(
    "$fetch",
    vi.fn(async (url: string, opts?: any) => {
      const method = String(opts?.method ?? "GET").toUpperCase();

      if (url === "/api/users" && method === "GET") {
        return db;
      }

      if (url === "/api/users" && method === "POST") {
        const name = String(opts?.body?.name ?? "").trim();
        const newUser = { id: Math.max(...db.map((u) => u.id)) + 1, name };
        db.push(newUser);
        return newUser;
      }

      const m = url.match(/^\/api\/users\/(\d+)$/);
      if (m && method === "GET") {
        const id = Number(m[1]);
        const found = db.find((u) => u.id === id);
        if (!found) throw new Error("not found");
        return found;
      }

      throw new Error("Not mocked: " + url);
    })
  );
});

describe("/users page", () => {
  it("shows list and can add user", async () => {
    const wrapper = await mountSuspended(UsersPage, { route: "/users" });

    await flushPromises();
    await nextTick();
    await flushPromises();

    expect(wrapper.get('[data-testid="user-list"]').text()).toContain("Alice");

    await wrapper.find("input").setValue("Bob");
    await wrapper.find("button").trigger("click");

    await flushPromises();
    await nextTick();
    await flushPromises();

    expect(wrapper.text()).toContain("追加しました");
    expect(wrapper.get('[data-testid="user-list"]').text()).toContain("Bob");
  });
});
