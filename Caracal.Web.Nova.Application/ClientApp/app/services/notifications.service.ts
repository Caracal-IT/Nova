import {Injectable} from '@angular/core';
import {ToastData, ToastyService} from 'ng2-toasty';

import {forkJoin} from "rxjs/observable/forkJoin";
import {NovaTranslatorService} from "nova-forms";

@Injectable()
export class ToastyNotificationsService {
    waitId = -1;
    
    constructor(
        private toastyService: ToastyService,
        private translateService: NovaTranslatorService) {
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
            this.translateService.get(title, this.parameters),
            this.translateService.get(message, this.parameters)
        ];

        forkJoin(sources)
            .subscribe(data => {
                const messageSettings = this.getMessageSetting(data);
                toasty(messageSettings);
            }, err => console.log(err));
    }

    wait(title: string, message: string) {
        if (this.waitId > -1)
            this.cancelWait();
        
        const sources = [
            this.translateService.get(title, this.parameters),
            this.translateService.get(message, this.parameters)
        ];

        forkJoin(sources)
            .subscribe(data => this.toastyService.wait({
                title: data[0],
                msg: data[1],
                theme: "bootstrap",
                showClose: true,
                timeout: 120000,
                onAdd: (toast:ToastData) => this.waitId = toast.id,
                onRemove: () => this.waitId = -1 
            }), err => console.log(err));
    }

    cancelWait(){
        this.toastyService.clear(this.waitId);
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