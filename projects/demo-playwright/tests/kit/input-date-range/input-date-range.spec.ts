import {expect, Locator, test} from '@playwright/test';
// eslint-disable-next-line @taiga-ui/experience/no-deep-imports
import {CHAR_NO_BREAK_SPACE} from '@taiga-ui/cdk/constants';

import {TuiDocumentationPagePO, tuiGoto, TuiInputDateRangePO} from '../../../utils';

test.describe(`InputDateRange`, () => {
    let example!: Locator;
    let inputDateRange!: TuiInputDateRangePO;

    test.use({
        viewport: {width: 650, height: 650},
    });

    test.beforeEach(async ({page}) => {
        await tuiGoto(page, `components/input-date-range`);

        example = new TuiDocumentationPagePO(page).apiPageExample;

        inputDateRange = new TuiInputDateRangePO(example.locator(`tui-input-date-range`));
    });

    test.describe(`API`, () => {
        [`s`, `m`, `l`].forEach(size => {
            test(`correct filler display for size ${size.toUpperCase()}`, async ({
                page,
            }) => {
                await tuiGoto(
                    page,
                    `components/input-date-range/API?tuiTextfieldSize=${size}`,
                );

                await inputDateRange.textfield.click();
                await expect(inputDateRange.textfield).toHaveScreenshot(
                    `01-textfield-size-${size}-empty.png`,
                );
                await expect(inputDateRange.calendar).toHaveScreenshot(
                    `01-calendar-size-${size}-empty.png`,
                );

                await inputDateRange.textfield.type(`01`);
                await expect(inputDateRange.textfield).toHaveScreenshot(
                    `02-textfield-size-${size}-set-day.png`,
                );
                await expect(inputDateRange.calendar).toHaveScreenshot(
                    `02-calendar-size-${size}-set-day.png`,
                );

                await inputDateRange.textfield.type(`.06.1994`);
                await expect(inputDateRange.textfield).toHaveScreenshot(
                    `03-textfield-size-${size}-set-from-date.png`,
                );
                await expect(inputDateRange.calendar).toHaveScreenshot(
                    `03-calendar-size-${size}-set-from-date.png`,
                );

                await inputDateRange.textfield.type(`01.01.2022`);
                await expect(inputDateRange.textfield).toHaveScreenshot(
                    `04-textfield-size-${size}-set-to-date.png`,
                );
                await expect(inputDateRange.calendar).toHaveScreenshot(
                    `04-calendar-size-${size}-set-to-date.png`,
                );
            });
        });

        test(`Maximum month less than current month`, async ({page}) => {
            await tuiGoto(page, `components/input-date-range/API?min$=3`);
            await inputDateRange.textfield.click();

            await expect(inputDateRange.textfield).toHaveScreenshot(
                `05-textfield-maximum-month.png`,
            );
            await expect(inputDateRange.calendar).toHaveScreenshot(
                `05-calendar-maximum-month.png`,
            );
        });

        test(`Minimum month more than current month`, async ({page}) => {
            await tuiGoto(page, `components/input-date-range/API?min$=3`);
            await inputDateRange.textfield.click();

            await expect(page).toHaveScreenshot(`06-input-date-range-minimum-month.png`, {
                mask: [page.locator(`tui-doc-page header`)],
            });
        });

        test.describe(`prevents changes if you enter an invalid date`, () => {
            test(`day > 31`, async ({page}) => {
                await tuiGoto(page, `components/input-date-range/API`);

                await inputDateRange.textfield.type(`32`);

                await expect(inputDateRange.textfield).toHaveValue(`3`);

                await inputDateRange.textfield.type(`1`);

                await expect(inputDateRange.textfield).toHaveValue(`31`);
            });

            test(`month > 12`, async ({page}) => {
                await tuiGoto(page, `components/input-date-range/API`);

                await inputDateRange.textfield.type(`2913`);

                await expect(inputDateRange.textfield).toHaveValue(`29.1`);

                await inputDateRange.textfield.type(`0`);
                await expect(inputDateRange.textfield).toHaveValue(`29.10`);
            });

            test(`pads date range if it is less than [minLength]`, async ({page}) => {
                await tuiGoto(page, `components/input-date-range/API?minLength$=0`); // minLength = {day: 3}

                await inputDateRange.textfield.type(`21052023-22052023`);

                await expect(inputDateRange.textfield).toHaveValue(
                    `21.05.2023${CHAR_NO_BREAK_SPACE}–${CHAR_NO_BREAK_SPACE}23.05.2023`,
                );
            });

            test(`cuts date range if it is more than [maxLength]`, async ({page}) => {
                await tuiGoto(page, `components/input-date-range/API?maxLength$=0`); // maxLength = {day: 5}

                await inputDateRange.textfield.type(`20052023-29052023`);

                await expect(inputDateRange.textfield).toHaveValue(
                    `20.05.2023${CHAR_NO_BREAK_SPACE}–${CHAR_NO_BREAK_SPACE}24.05.2023`,
                );
            });
        });
    });
});
