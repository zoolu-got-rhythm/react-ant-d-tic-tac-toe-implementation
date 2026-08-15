import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
    await page.goto("http://localhost:3000/practice");
    await page.getByLabel("cell 1 = empty").click({
        position: {
            x: 22,
            y: 11,
        },
    });

    await expect(page.getByLabel("cell 1 = x")).toBeVisible();

    await page.getByRole("button", { name: "back to start" }).click();
    await expect(page.getByLabel("cell 1 = empty")).toBeVisible();
});
