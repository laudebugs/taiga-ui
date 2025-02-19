import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {DisableAnimationComponent} from './disable-animation.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiLinkModule,
        RouterModule.forChild(tuiGenerateRoutes(DisableAnimationComponent)),
    ],
    declarations: [DisableAnimationComponent],
})
export class DisableAnimationModule {}
