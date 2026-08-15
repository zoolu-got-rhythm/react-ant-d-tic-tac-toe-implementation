import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
    await page.goto("http://localhost:3000/practice");
    await page.getByLabel("cell 0 = empty").click({
        position: {
            x: 20,
            y: 24,
        },
    });
    await page.getByLabel("cell 6 = empty").click({
        position: {
            x: 29,
            y: 36,
        },
    });
    await page.getByLabel("cell 4 = empty").click({
        position: {
            x: 31,
            y: 16,
        },
    });
    await page.getByLabel("cell 8 = empty").click({
        position: {
            x: 33,
            y: 30,
        },
    });
    await page.getByLabel("cell 2 = empty").click({
        position: {
            x: 39,
            y: 27,
        },
    });
    await page.getByLabel("cell 1 = empty").click({
        position: {
            x: 29,
            y: 18,
        },
    });
    await page.getByLabel("cell 7 = empty").click({
        position: {
            x: 44,
            y: 11,
        },
    });
    await page.getByLabel("cell 3 = empty").click({
        position: {
            x: 21,
            y: 12,
        },
    });
    await page.getByLabel("cell 5 = empty").click({
        position: {
            x: 31,
            y: 23,
        },
    });
    await expect(page.getByText("draw")).toBeVisible();
});
