import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test.use({ storageState: undefined });

test.describe("로그인 및 로그아웃 플로우", () => {
  test("사용자가 로그인에 성공하면 노트 페이지로 이동되고, 이후 로그아웃을 진행하면 로그인 페이지로 이동합니다.", async ({
    page,
  }) => {
    const res = await page.context().request.post(`${process.env.VITE_SERVER_URL}/users/e2e`, {
      data: { e2eWorkerIndex: 0 },
      headers: { "e2e-key": process.env.E2E_KEY ?? "" },
    });

    console.log("POST /users/e2e", res.status(), await res.text());
    expect(res.ok()).toBeTruthy();

    await page.goto("/notes");
    await expect(page).toHaveURL("/notes");

    await page.getByText("로그아웃").click();
    await expect(page).toHaveURL("/login");
  });
});
