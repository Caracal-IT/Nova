import {Injectable} from '@angular/core';
import {ToastyService} from 'ng2-toasty';

import {forkJoin} from "rxjs/observable/forkJoin";
import {TranslateService} from "ng2-translate";

@Injectable()
export class ToastyNotificationsService {
    constructor(private toastyService: ToastyService,
                private translateService: TranslateService) {
    }

    parameters: any | undefined;

    error(title: string, message: string) {
        this.clearAll();

        this.show(title, message, (message) => this.toastyService.error(message));
    }

    success(title: string, message: string) {
        this.show(title, message, (message) => this.toastyService.success(message));
    }

    info(title: string, message: string) {
        this.show(title, message, (message) => this.toastyService.info(message));
    }

    default(title: string, message: string) {
        this.show(title, message, (message) => this.toastyService.default(message));
    }

    warning(title: string, message: string) {
        this.show(title, message, (message) => this.toastyService.warning(message));
    }

    private show(title: string, message: string, toasty: (message: any) => void) {
        const sources = [
            this.translateService.get(title),
            this.translateService.get(message)
        ];

        forkJoin(sources)
            .subscribe(data => {
                var messageSettings = this.getMessageSetting(data);
                toasty(messageSettings);
            }, err => console.log(err));
    }

    wait(title: string, message: string) {
        const sources = [
            this.translateService.get(title),
            this.translateService.get(message)
        ];

        forkJoin(sources)
            .subscribe(data => this.toastyService.wait({
                title: data[0],
                msg: data[1],
                theme: "bootstrap",
                showClose: true,
                timeout: 120000
            }), err => console.log(err));
    }

    clearAll() {
        this.toastyService.clearAll();
    }

    private getMessageSetting(data: string[]) {
        return {
            title: data[0],
            msg: data[1],
            theme: "bootstrap",
            showClose: true,
            timeout: 5000
        };
    }
}