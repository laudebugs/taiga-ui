import {tuiEnsureDocExample} from '@demo-cypress/support/helpers/example-id-utils';

describe(`DataList`, () => {
    beforeEach(() => {
        cy.tuiVisit(`/components/data-list`);
    });

    it(`Custom list`, () => {
        cy.get(`#custom tui-select`).should(`be.visible`).click();
        cy.get(`tui-dropdown`).should(`be.visible`).matchImageSnapshot(`1-#custom`);
    });

    it(`Links`, () => {
        cy.get(
            `#links [automation-id=${tuiEnsureDocExample()}] tui-hosted-dropdown`,
        ).click();
        cy.get(`tui-dropdown`).should(`be.visible`).matchImageSnapshot(`2-#links`);
    });

    it(`Submenu`, () => {
        // 300ms - debounce time of DataListDropdownManager + 100ms for flaky-free test
        const dataListDebounce = 400;

        cy.get(`#submenu [automation-id=${tuiEnsureDocExample()}] tui-hosted-dropdown`)
            .tuiScrollIntoView()
            .click();

        cy.get(`body`)
            .type(`{downarrow}`.repeat(2))
            .wait(dataListDebounce)
            .type(`{rightarrow}`)
            .type(`{downarrow}`.repeat(3))
            .wait(dataListDebounce)
            .type(`{rightarrow}`)
            .type(`{downarrow}`.repeat(2));

        cy.get(`tui-doc-page`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`3-#submenu`, {
                capture: `viewport`,
            });
    });

    it(`Form control`, () => {
        cy.get(`#control [automation-id=${tuiEnsureDocExample()}] tui-hosted-dropdown`)
            .tuiScrollIntoView()
            .click();

        cy.get(`tui-dropdown`)
            .should(`be.visible`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`4-#control`);
    });

    it(`Complex`, {responseTimeout: 30_000}, () => {
        cy.get(`tui-doc-example[id=complex] .t-demo`)
            .tuiScrollIntoView()
            .as(`complexDemo`);

        cy.get(`tui-doc-page`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`5-1-data-list-initial`, {capture: `viewport`});

        cy.get(`@complexDemo`).find(`button`).first().click();

        cy.get(`tui-doc-page`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`5-2-data-list-opened`, {capture: `viewport`});

        cy.getByAutomationId(`tui-data-money-input`)
            .findByAutomationId(`tui-primitive-textfield__native-input`)
            .should(`have.value`, `1000`)
            .focus()
            .clear()
            .should(`have.value`, ``)
            .type(`2000`, {force: true});

        cy.get(`tui-doc-page`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`5-3-data-list-converted-money`, {capture: `viewport`});

        cy.getByAutomationId(`tui-data-list-email-option`)
            .tuiWaitBeforeAction()
            .click()
            .getByAutomationId(`tui-data-list-email-field`)
            .findByAutomationId(`tui-primitive-textfield__native-input`)
            .should(`have.value`, `mail@mail.ru`)
            .focus()
            .clear()
            .should(`have.value`, ``)
            .type(`demo@taiga-ui.io`, {force: true});

        cy.get(`tui-doc-page`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`5-4-data-list-email-opened`, {capture: `viewport`});

        cy.getByAutomationId(`tui-data-list-range-option`)
            .tuiWaitBeforeAction()
            .click({force: true})
            .getByAutomationId(`tui-data-list-range-field`)
            .findByAutomationId(`tui-primitive-textfield__native-input`)
            .focus()
            .clear()
            .should(`have.value`, ``)
            .type(`04.02.2022 – 04.02.2023`, {force: true});

        cy.get(`tui-doc-page`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`5-5-data-list-range-opened`, {capture: `viewport`});

        cy.getByAutomationId(`tui-data-list-calendar-option`)
            .tuiWaitBeforeAction()
            .click({force: true})
            .getByAutomationId(`tui-primitive-calendar__cell`)
            .eq(4)
            .click({force: true});

        cy.get(`tui-doc-page`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`5-6-data-list-calendar-opened`, {capture: `viewport`});

        cy.get(`@complexDemo`).tuiWaitBeforeAction().click();

        cy.get(`tui-doc-page`)
            .tuiWaitBeforeScreenshot()
            .matchImageSnapshot(`5-7-data-list-finish`, {capture: `viewport`});
    });

    it(`Options with long text`, () => {
        cy.get(
            `#long-text-options [automation-id=${tuiEnsureDocExample()}] tui-hosted-dropdown`,
        )
            .tuiScrollIntoView()
            .click();

        cy.get(`tui-dropdown`)
            .should(`be.visible`)
            .matchImageSnapshot(`6-#long-text-options`);
    });
});
