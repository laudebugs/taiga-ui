import {TuiContextWithImplicit} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {Observable, Observer} from 'rxjs';

import type {TuiSheetOptions} from './sheet-options';

/**
 * @deprecated: drop in v4.0
 */
export interface TuiSheet<O, I = undefined>
    extends TuiSheetOptions<I, O>,
        TuiContextWithImplicit<Observer<O>> {
    completeWith(value: O): void;
    readonly content: PolymorpheusContent<TuiSheet<O, I>>;
    readonly scroll$: Observable<number>;
}

/**
 * @deprecated: drop in v4.0
 */
export interface TuiSheetRequiredProps<T = unknown> {
    item: TuiSheet<T>;
    stops: readonly number[];
}
