import {forwardRef, SkipSelf} from '@angular/core';
import {
    INTERSECTION_ROOT_MARGIN,
    INTERSECTION_THRESHOLD,
    IntersectionObserverService,
} from '@ng-web-apis/intersection-observer';
import {
    MODE_PROVIDER,
    TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
    TUI_TEXTFIELD_LABEL_OUTSIDE,
    TUI_TEXTFIELD_SIZE,
    TuiAppearance,
    TuiTextfieldAppearanceDirective,
} from '@taiga-ui/core';
import {TUI_INPUT_COUNT_OPTIONS, TuiInputCountOptions} from '@taiga-ui/kit';

import {TuiTableDirective} from '../directives/table.directive';
import {TUI_STUCK_PROVIDER} from './stuck.provider';

export const TUI_TABLE_PROVIDERS = [
    {
        provide: INTERSECTION_ROOT_MARGIN,
        useValue: `10000px 10000px 10000px 0px`,
    },
    {
        provide: INTERSECTION_THRESHOLD,
        useValue: [0, 1],
    },
    {
        provide: TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
        useFactory: (): TuiTextfieldAppearanceDirective => {
            const directive = new TuiTextfieldAppearanceDirective();

            directive.appearance = TuiAppearance.Table;

            return directive;
        },
    },
    {
        provide: TUI_TEXTFIELD_LABEL_OUTSIDE,
        useValue: {
            labelOutside: true,
        },
    },
    {
        provide: TUI_INPUT_COUNT_OPTIONS,
        deps: [[new SkipSelf(), TUI_INPUT_COUNT_OPTIONS]],
        useFactory: (options: TuiInputCountOptions): TuiInputCountOptions => ({
            ...options,
            hideButtons: true,
        }),
    },
    {
        provide: TUI_TEXTFIELD_SIZE,
        useExisting: forwardRef(() => TuiTableDirective),
    },
    IntersectionObserverService,
    MODE_PROVIDER,
    TUI_STUCK_PROVIDER,
];
