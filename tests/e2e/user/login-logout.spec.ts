import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test.describe("로그인 및 로그아웃 플로우", () => {
  test("사용자가 로그인에 성공하면 노트 페이지로 이동되고, 이후 로그아웃을 진행하면 로그인 페이지로 이동합니다.", async ({
    page,
  }) => {
    const email = process.env.USER_0_GOOGLE_EMAIL;
    const password = process.env.USER_0_GOOGLE_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "USER_0_GOOGLE_EMAIL 또는 USER_0_GOOGLE_PASSWORD가 .env에 설정되지 않았습니다."
      );
    }

    await page.goto("/login");

    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "구글 로그인 하기" }).click({ delay: 500 });
    const popup = await popupPromise;

    await popup.fill('input[type="email"]', email);
    await popup.getByRole("button", { name: "Next" }).click();
    await popup.fill('input[type="password"]', password);
    await popup.getByRole("button", { name: "Next" }).click();

    await popup.getByRole("button", { name: "계속" }).click();
    await page.waitForURL("/notes");
    await expect(page).toHaveURL("/notes");

    await page.getByText("로그아웃").click();
    await page.waitForURL("/login");
    await expect(page).toHaveURL("/login");
  });
});
