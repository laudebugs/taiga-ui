import {ElementRef, Inject, Injectable} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';
import {tuiTypedFromEvent} from '@taiga-ui/cdk/observables';
import {defer, merge, Observable} from 'rxjs';

/**
 * Service that subscribes to scroll events of all parent elements
 */
@Injectable()
export class TuiParentsScrollService extends Observable<Event> {
    private readonly callback$: Observable<Event>;

    constructor(
        // Destructuring here causes memory leak
        @Inject(ElementRef) el: ElementRef<Element>,
        @Inject(WINDOW) win: Window,
    ) {
        super(subscriber => this.callback$.subscribe(subscriber));

        this.callback$ = defer(() => {
            let {nativeElement} = el;
            const eventTargets: Array<Element | Window> = [win, nativeElement];

            while (nativeElement.parentElement) {
                nativeElement = nativeElement.parentElement;
                eventTargets.push(nativeElement);
            }

            return merge(
                ...eventTargets.map<Observable<Event>>(element =>
                    tuiTypedFromEvent(element, `scroll`),
                ),
            );
        });
    }
}
