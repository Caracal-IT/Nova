import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToastyNotificationsService} from "../../services/notifications.service";
import {WorkflowModule} from 'nova-workflow';
import {NovaTranslationsService} from "nova-forms";
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private subscription: Subscription | undefined;

    params: any | undefined;
    showMenu = true;

    constructor(public elementRef: ElementRef,
                private notificationsService: ToastyNotificationsService,
                private translate: TranslateService,
                private activatedRoute: ActivatedRoute) {

        let native = this.elementRef.nativeElement;
        let parameters = native.getAttribute("parameters");
        
        if (parameters) {
            this.params = JSON.parse(parameters);

            if (this.params.showMenu !== undefined)
                this.showMenu = this.params.showMenu;

            if (this.params.workflowServer)
                WorkflowModule.setWorkflowServerUrl(this.params.workflowServer);
        }
    }

    ngOnInit() {
        this.translate.addLangs(["en", "af", "it"]);
        this.translate.setDefaultLang('en');
        
        let browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|af|it/) ? browserLang : 'en');

        this.notificationsService.success('SiteName', 'WelcomeMessage')

        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                let locale = param['locale'];

                if (locale !== undefined)
                    this.translate.use(locale);
            });
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}