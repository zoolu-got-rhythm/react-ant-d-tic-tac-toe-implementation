import { test, expect } from "@playwright/test";

test("turn indicator updates", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.locator("div:nth-child(3)").first().click();
    await expect(
        page.getByRole("button", { name: "go to turn" }),
    ).toBeVisible();
    await page.locator(".board > div:nth-child(2) > div:nth-child(2)").click();
    await expect(
        page.getByRole("button", { name: "go to turn 2" }),
    ).toBeVisible();
    await page.locator("div:nth-child(2) > div:nth-child(3)").first().click();
    await expect(
        page.getByRole("button", { name: "go to turn 3" }),
    ).toBeVisible();
    await page.locator("div:nth-child(3) > div:nth-child(2)").click();
    await expect(
        page.getByRole("button", { name: "go to turn 4" }),
    ).toBeVisible();
    await page.locator("div:nth-child(3) > div:nth-child(3)").click();
    await expect(
        page.getByRole("button", { name: "go to turn 5" }),
    ).toBeVisible();
    await expect(page.getByText("winner of game is x")).toBeVisible();
    await page.locator("div:nth-child(3) > div").first().click();
    await expect(
        page.getByRole("button", { name: "go to turn 6" }),
    ).not.toBeVisible();
});
