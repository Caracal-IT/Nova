import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppErrorHandler} from "./services/app.error-handler";
import {AppComponent} from './components/app/app.component';
import {HomeComponent} from './components/home/home.component';
import {NavMenuComponent} from './components/navmenu/navmenu.component';
import {ToastyNotificationsService} from "./services/notifications.service";
import {ToastyModule} from "ng2-toasty";
import {
    TranslateLoader,
    TranslateModule,
    TranslateStaticLoader
} from "ng2-translate";
import {PaperModule} from "nova-paper";
import {DynamicFormModule, DynamicFormService, NovaTranslatorService} from "nova-forms";
import {
    WorkflowModule,
    WorkflowComponent,
    NotificationsService,
    NovaFormService, 
    WorkflowProviderService, 
    ActivityFactoryService
} from 'nova-workflow';
import {NovaModule} from "../nova/nova.module";
import {MagicInputComponent} from "./components/magic-input/nova-input.component";

import {
    AnalyticsClient, 
    AnalyticsModule, 
    AnalyticsService, 
    EventService, 
    GeoLocation,
    SpatialClient
} from "nova-analytics";
import {NovaCoreLibModule} from "nova-core-lib";
import {ElasticAnalyticsClient} from "./clients/elastic-analytics.client";
import {NovaSpatialClient} from "./clients/nova-spatial.client";
import {NgTranslateTranslatorService} from "./services/nova-translator.service";
import {NovaActivityFactoryService} from "./services/nova-activity-factory-service";

export function createTranslateLoader(http: Http){
    return new TranslateStaticLoader(http,  './assets/i18n', '.json');
}


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        MagicInputComponent
    ],
    providers: [
        GeoLocation,
        AnalyticsService,
        EventService,
        ToastyNotificationsService,
        {provide: ErrorHandler, useClass: AppErrorHandler}
    ],
    entryComponents: [
        MagicInputComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
        NovaCoreLibModule.forRoot(),
        DynamicFormModule.forRoot(
            {
                provide: NovaTranslatorService,
                useClass: NgTranslateTranslatorService
            }
        ),
        PaperModule,
        NovaModule,
        AnalyticsModule.forRoot(
            {
                provide: AnalyticsClient,
                useClass: ElasticAnalyticsClient
            },
            {
                provide: SpatialClient,
                useClass: NovaSpatialClient
            }
        ),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [Http]
        }),
        WorkflowModule.forRoot(
            {
                provide: NotificationsService,
                useClass: ToastyNotificationsService
            },
            {
                provide: NovaFormService,
                useClass: DynamicFormService
            },
            {
                provide: WorkflowProviderService,
                useClass: WorkflowProviderService
            }, 
            {
                provide: ActivityFactoryService,
                useClass: NovaActivityFactoryService
            }
        ),
        RouterModule.forRoot([
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: ':wf', component: WorkflowComponent},
            {path: ':wf/:act', component: WorkflowComponent},
            {path: '**', redirectTo: 'home'}
        ])
    ]
})
export class AppModuleShared {
    constructor() {
        let components = [];
        components.push({key: "magic-input", component: MagicInputComponent});
        
        DynamicFormModule.registerComponents();
        DynamicFormModule.addModules(PaperModule.getComponents());
        DynamicFormModule.addModules(NovaModule.getComponents());
        DynamicFormModule.addModules(components);        
    }
}