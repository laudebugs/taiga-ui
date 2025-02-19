import {ComponentRef, EmbeddedViewRef, TemplateRef} from '@angular/core';
import {AbstractTuiPortalHostComponent} from '@taiga-ui/cdk';
import {tuiSwitchNgDevMode} from '@taiga-ui/testing';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

import {TuiDropdownPortalService} from '../dropdown-portal.service';

describe(`PortalService`, () => {
    let service: TuiDropdownPortalService;

    beforeEach(() => {
        service = new TuiDropdownPortalService();
    });

    it(`Template removing`, () => {
        let called = 0;
        const viewRefStub: EmbeddedViewRef<unknown> = {
            destroy: () => called++,
        } as unknown as EmbeddedViewRef<unknown>;

        service.removeTemplate(viewRefStub);
        expect(called).toBe(1);
    });

    it(`HostView removing`, () => {
        let called = 0;
        const componentRefStub: ComponentRef<unknown> = {
            hostView: {destroy: () => called++},
        } as unknown as ComponentRef<unknown>;

        service.remove(componentRefStub);
        expect(called).toBe(1);
    });

    describe(`production mode`, () => {
        it(`throws an error with no host`, () => {
            let actual = ``;
            const a = null as unknown as PolymorpheusComponent<unknown>;

            try {
                service.add(a);
            } catch (err) {
                actual = err.message;
            }

            expect(actual).toBe(``);
        });
    });

    describe(`dev mode`, () => {
        beforeEach(() => tuiSwitchNgDevMode(true));

        it(`throws an error with no host`, () => {
            let actual = ``;
            const a = null as unknown as PolymorpheusComponent<unknown>;

            try {
                service.add(a);
            } catch (err) {
                actual = err.message;
            }

            expect(actual).toBe(`Portals cannot be used without TuiPortalHostComponent`);
        });

        afterEach(() => tuiSwitchNgDevMode(false));
    });

    it(`addTemplateChild with host attached`, () => {
        const a: TemplateRef<unknown> = null as unknown as TemplateRef<unknown>;
        const result: EmbeddedViewRef<unknown> =
            {} as unknown as EmbeddedViewRef<unknown>;
        const componentPortalStub: AbstractTuiPortalHostComponent = {
            addTemplateChild: () => result,
        } as unknown as AbstractTuiPortalHostComponent;

        service.attach(componentPortalStub);

        expect(service.addTemplate(a)).toBe(result);
    });
});
