import {tuiGoto} from '@demo-playwright/utils';
import {expect, test} from '@playwright/test';

test.describe(`AlertService`, () => {
    test.use({
        viewport: {width: 720, height: 720},
    });

    test(`is shown correctly`, async ({page}) => {
        await tuiGoto(page, `/services/alert-service`);
        const example = page.locator(`#text`);
        const showAlertButton = example.locator(`tui-alerts-example-1 button`).first();

        await showAlertButton.click();

        await expect(page.locator(`tui-alert`)).toHaveScreenshot(`01-alert-service.png`);
    });
});
