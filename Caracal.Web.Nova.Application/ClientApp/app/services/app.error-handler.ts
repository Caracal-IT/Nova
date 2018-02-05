import {ErrorHandler, Inject, isDevMode, NgZone} from '@angular/core';
import {ToastyNotificationsService} from "./notifications.service";

//import * as Raven from 'raven-js';

export class AppErrorHandler implements ErrorHandler {
    constructor(
       @Inject(ToastyNotificationsService) private notificationsService: ToastyNotificationsService
    ) { }

    handleError(error: any): void {
         //this.ngZone.run(() => {
            this.notificationsService.error('Errors.Title', 'Errors.General');

            //if(!isDevMode)
               // this.notificationsService.logError(error);
        //});

        //if(!isDevMode)
            //Raven.captureException(error.originalError || error);
        //else
           // throw error;
    }
}