import {Component, Inject} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiAlertService} from '@taiga-ui/core';
import {TuiPushService} from '@taiga-ui/kit';
import {switchMap, take} from 'rxjs/operators';

@Component({
    selector: 'tui-push-example-2',
    templateUrl: './index.html',
    encapsulation,
    changeDetection,
})
export class TuiPushExample2 {
    constructor(
        @Inject(TuiPushService) protected readonly push: TuiPushService,
        @Inject(TuiAlertService) protected readonly alert: TuiAlertService,
    ) {}

    onClick(): void {
        this.push
            .open('This is <strong>heavy</strong>!', {
                heading: 'Great Scott!',
                type: 'Quote',
                icon: 'tuiIconVideoLarge',
                buttons: ['Roads?', '1.21 Gigawatts!?!'],
            })
            .pipe(
                take(1),
                switchMap(button => this.alert.open(button)),
            )
            .subscribe();
    }
}
