import { test, expect } from "@playwright/test";

test("undo turn history", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.locator("div:nth-child(3)").first().click();
    await page.getByRole("button", { name: "back to start" }).click();
    await expect(page.locator("div:nth-child(3)").first()).toHaveText("");
    await page.getByRole("button", { name: "go to turn 1" }).click();
    await expect(page.locator("div:nth-child(3)").first()).toHaveText("x");
});
