import { test, expect } from "@playwright/test";

test("turn indicator updates", async ({ page }) => {
    await page.goto("http://localhost:3000/practice");
    await page.getByLabel("cell 1 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });
    await expect(
        page.getByRole("button", { name: "go to turn 1" }),
    ).toBeVisible();
    await expect(
        page.getByRole("button", { name: "go to turn 2" }),
    ).not.toBeVisible();

    await page.getByLabel("cell 2 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });
    await expect(
        page.getByRole("button", { name: "go to turn 2" }),
    ).toBeVisible();
});
