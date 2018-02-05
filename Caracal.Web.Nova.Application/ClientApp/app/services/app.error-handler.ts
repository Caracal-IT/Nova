import {ErrorHandler, Inject} from '@angular/core';
import {ToastyNotificationsService} from "./notifications.service";

export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(ToastyNotificationsService) private notificationsService: ToastyNotificationsService) {
    }

    handleError(error: any): void {
        console.log(error);
        this.notificationsService.error('Errors.Title', 'Errors.General');
    }
}