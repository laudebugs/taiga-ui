import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {configureTestSuite} from '@taiga-ui/testing';

import {TuiInputExpireComponent} from '../input-expire.component';
import {TuiInputExpireModule} from '../input-expire.module';

describe(`InputExpire`, () => {
    @Component({
        template: `
            <tui-input-expire [(ngModel)]="value"></tui-input-expire>
        `,
    })
    class TestComponent {
        @ViewChild(TuiInputExpireComponent)
        input!: TuiInputExpireComponent;

        value = ``;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let input: HTMLInputElement;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, TuiInputExpireModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        input = fixture.debugElement.query(By.css(`input`)).nativeElement;

        await fixture.whenStable();
    });

    it(`does not change the correct input`, () => {
        input.value = `12/12`;
        input.dispatchEvent(new Event(`input`, {bubbles: true}));

        expect(testComponent.value).toBe(`12/12`);
        expect(input.value).toBe(`12/12`);
    });
});
