import {Directive, HostBinding, Inject, Input} from '@angular/core';
import {TuiDirectiveStylesService} from '@taiga-ui/cdk';
import {TuiOrientation, TuiSizeL} from '@taiga-ui/core/types';

import {TuiGroupStylesComponent} from './group-styles.component';

@Directive({
    selector: '[tuiGroup]:not(ng-container)',
    host: {
        class: 'tui-group',
        role: 'group',
    },
})
export class TuiGroupDirective {
    @Input()
    orientation: TuiOrientation = 'horizontal';

    @Input()
    @HostBinding('class.tui-group_adaptive')
    adaptive = false;

    @Input()
    @HostBinding('class.tui-group_collapsed')
    collapsed = false;

    @Input()
    @HostBinding('class.tui-group_rounded')
    rounded = true;

    @Input()
    size: TuiSizeL = 'm';

    constructor(
        @Inject(TuiDirectiveStylesService) directiveStyles: TuiDirectiveStylesService,
    ) {
        directiveStyles.addComponent(TuiGroupStylesComponent);
    }

    @HostBinding('class.tui-group_orientation_horizontal')
    get orientationHorizontal(): boolean {
        return this.orientation === 'horizontal';
    }

    @HostBinding('class.tui-group_orientation_vertical')
    get orientationVertical(): boolean {
        return this.orientation === 'vertical';
    }

    @HostBinding('class.tui-group_radius_large')
    get sizeLarge(): boolean {
        return this.size === 'l';
    }
}
