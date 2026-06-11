import { test, expect } from "@playwright/test";

test("board resets", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.locator("div:nth-child(3)").first().click();
    await page.locator("div:nth-child(2) > div:nth-child(3)").first().click();
    await expect(page.locator("div:nth-child(3)").first()).toHaveText("x");
    await expect(
        page.locator("div:nth-child(2) > div:nth-child(3)").first(),
    ).toHaveText("o");
    await page.getByRole("button", { name: "back to start" }).click();
    await expect(page.locator("div:nth-child(3)").first()).toHaveText("");
    await expect(
        page.locator("div:nth-child(2) > div:nth-child(3)").first(),
    ).toHaveText("");
});
