import { describe, it, expect, vi } from "vitest";

const useFetchMock = vi.fn();
const createErrorMock = vi.fn((e: any) => e);

vi.mock("#app", () => {
  return {
    useRuntimeConfig: () => ({
      public: { apiBase: "http://localhost:3001" },
    }),
    useFetch: useFetchMock,
    createError: createErrorMock,
  };
});

describe("useUser", () => {
  it("calls correct URL", async () => {
    const { useUser } = await import("./useUser");

    useUser(123);

    expect(useFetchMock).toHaveBeenCalledTimes(1);

    const call = useFetchMock.mock.calls[0];
    expect(call[0]).toBe("http://localhost:3001/api/users/123");
    expect(call[1]).toMatchObject({
      onResponseError: expect.any(Function),
    });
  });
});
