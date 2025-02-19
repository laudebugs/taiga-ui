import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Inject,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
    AbstractTuiControl,
    tuiAsControl,
    tuiAsFocusableItemAccessor,
    TuiContextWithImplicit,
    TuiFocusableElementAccessor,
    TuiInputType,
    TuiNativeFocusableElement,
} from '@taiga-ui/cdk';
import {
    MODE_PROVIDER,
    TUI_MODE,
    TUI_TEXTFIELD_SIZE,
    TuiBrightness,
    TuiHintOptionsDirective,
    TuiPrimitiveTextfieldComponent,
    TuiSizeL,
    TuiSizeS,
    TuiTextfieldSizeDirective,
} from '@taiga-ui/core';
import {TUI_PASSWORD_TEXTS} from '@taiga-ui/kit/tokens';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {combineLatest, EMPTY, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {
    TUI_INPUT_PASSWORD_OPTIONS,
    TuiInputPasswordOptions,
} from './input-password.options';

@Component({
    selector: 'tui-input-password',
    templateUrl: './input-password.template.html',
    styleUrls: ['./input-password.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAsFocusableItemAccessor(TuiInputPasswordComponent),
        tuiAsControl(TuiInputPasswordComponent),
        MODE_PROVIDER,
    ],
})
export class TuiInputPasswordComponent
    extends AbstractTuiControl<string>
    implements TuiFocusableElementAccessor
{
    @ViewChild(TuiPrimitiveTextfieldComponent)
    private readonly textfield?: TuiPrimitiveTextfieldComponent;

    private readonly directive$: Observable<any> = this.hintOptions?.change$ || EMPTY;

    isPasswordHidden = true;

    readonly computedAppearance$: Observable<string> = combineLatest([
        this.mode$.pipe(map(val => (val === 'onDark' ? 'onDark' : ''))),
        this.directive$.pipe(
            startWith(null),
            map(() => this.hintOptions?.appearance || ''),
        ),
    ]).pipe(
        map(([mode, controller]) => controller || mode),
        startWith(''),
    );

    readonly type!: TuiContextWithImplicit<TuiSizeL | TuiSizeS>;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) cdr: ChangeDetectorRef,
        @Inject(TUI_TEXTFIELD_SIZE)
        private readonly textfieldSize: TuiTextfieldSizeDirective,
        @Inject(TUI_PASSWORD_TEXTS)
        readonly passwordTexts$: Observable<[string, string]>,
        @Inject(TUI_INPUT_PASSWORD_OPTIONS)
        readonly options: TuiInputPasswordOptions,
        @Optional()
        @Inject(TuiHintOptionsDirective)
        readonly hintOptions: TuiHintOptionsDirective | null,
        @Inject(TUI_MODE)
        private readonly mode$: Observable<TuiBrightness | null>,
    ) {
        super(control, cdr);
    }

    @HostBinding('attr.data-size')
    get size(): TuiSizeL | TuiSizeS {
        return this.textfieldSize.size;
    }

    get nativeFocusableElement(): TuiNativeFocusableElement | null {
        return this.computedDisabled || !this.textfield
            ? null
            : this.textfield.nativeFocusableElement;
    }

    get focused(): boolean {
        return !!this.textfield?.focused;
    }

    get icon(): PolymorpheusContent<TuiContextWithImplicit<TuiSizeL | TuiSizeS>> {
        return this.isPasswordHidden ? this.options.icons.hide : this.options.icons.show;
    }

    get inputType(): TuiInputType {
        return this.isPasswordHidden || !this.interactive ? 'password' : 'text';
    }

    onValueChange(textValue: string): void {
        this.value = textValue;
    }

    onFocused(focused: boolean): void {
        this.updateFocused(focused);
    }

    togglePasswordVisibility(): void {
        this.isPasswordHidden = !this.isPasswordHidden;
    }

    protected getFallbackValue(): string {
        return '';
    }
}
