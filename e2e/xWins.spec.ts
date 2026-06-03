import { test, expect } from "@playwright/test";
import sleep from "../shared/sleep";

test("x wins diagonally", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.locator(".cell").first().click();
    await page.locator(".row > div:nth-child(2)").first().click();
    await page.locator(".board > div:nth-child(2) > div:nth-child(2)").click();
    await page.locator("div:nth-child(3) > div").first().click();
    await page.locator("div:nth-child(3) > div:nth-child(3)").click();
    await expect(page.getByText("winner of game is x")).toBeVisible();
});
