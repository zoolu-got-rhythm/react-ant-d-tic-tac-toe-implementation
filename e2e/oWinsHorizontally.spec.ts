import { test, expect } from "@playwright/test";

test("draw game", async ({ page }) => {
    await page.goto("http://localhost:3000/practice");

    await page.getByLabel("cell 3 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });
    await page.getByLabel("cell 0 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });
    await page.getByLabel("cell 4 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });

    await page.getByLabel("cell 1 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });

    await page.getByLabel("cell 6 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });

    await page.getByLabel("cell 2 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });
    await expect(page.getByText("winner of game is o")).toBeVisible();
});
