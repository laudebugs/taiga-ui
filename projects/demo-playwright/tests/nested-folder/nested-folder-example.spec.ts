import {tuiGoto} from '@demo-playwright/utils';
import {expect, test} from '@playwright/test';

test(`screen inside nested folder`, async ({page}) => {
    await tuiGoto(page, `/components/mobile-calendar`);

    await expect(page.locator(`tui-mobile-calendar-example-1`)).toHaveScreenshot(
        `button-screen.png`,
    );
});
