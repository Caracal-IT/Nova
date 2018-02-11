import {ErrorHandler, Inject} from '@angular/core';
import {ToastyNotificationsService} from "./notifications.service";
import {AnalyticsService} from "./analytics.service";

export class AppErrorHandler implements ErrorHandler {
    constructor(
        @Inject(ToastyNotificationsService) private notificationsService: ToastyNotificationsService,
        @Inject(AnalyticsService) private analyticsService: AnalyticsService
    ) { }

    handleError(error: any): void {
        console.log(error);
        this.notificationsService.error('Errors.Title', 'Errors.General');

        const event = new CustomEvent<any>('custom-error',
            {
                detail: {
                    error: error
                },

            });
        
            window.dispatchEvent(event);
    }
}