import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {tuiGetDocModules} from '@taiga-ui/addon-doc';
import {TuiHostedDropdownModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiAppearanceModule, TuiButtonModule} from '@taiga-ui/experimental';

import {ExampleTuiAppearanceComponent} from './appearance.component';
import {TuiAppearanceExample1} from './examples/1';
import {TuiAppearanceExample2} from './examples/2';
import {TuiAppearanceExample3} from './examples/3';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TuiAppearanceModule,
        TuiNotificationModule,
        TuiButtonModule,
        TuiHostedDropdownModule,
        tuiGetDocModules(ExampleTuiAppearanceComponent),
    ],
    declarations: [
        ExampleTuiAppearanceComponent,
        TuiAppearanceExample1,
        TuiAppearanceExample2,
        TuiAppearanceExample3,
    ],
    exports: [ExampleTuiAppearanceComponent],
})
export class ExampleTuiAppearanceModule {}
