import {ErrorHandler, NgModule, ValueProvider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppErrorHandler} from "./services/app.error-handler";
import {AppComponent} from './components/app/app.component';
import {HomeComponent} from './components/home/home.component';
import {NavMenuComponent} from './components/navmenu/navmenu.component';
import {FetchDataComponent} from './components/fetchdata/fetchdata.component';
import {ToastyNotificationsService} from "./services/notifications.service";
import {ToastyModule} from "ng2-toasty";
import {
    TranslateLoader,
    TranslateModule, TranslateService,
    TranslateStaticLoader
} from "ng2-translate";
import {PaperModule} from "nova-paper";
import {DynamicFormModule, DynamicFormService, NovaTranslatorService} from "nova-forms";
import {
    WorkflowModule,
    WorkflowComponent,
    NotificationsService,
    NovaFormService
} from 'nova-workflow';
import {NovaModule} from "../nova/nova.module";
import {MagicInputComponent} from "./components/magic-input/nova-input.component";

import {AnalyticsClient, AnalyticsModule, AnalyticsService, GeoLocation, SpatialClient} from "nova-analytics";
import {EventConfig} from "./config/event.config";
import {WorkflowEventConfig} from "./config/workflow.event.config";
import {NovaCoreLibModule} from "nova-core-lib";
import {ElasticAnalyticsClient} from "./clients/elastic-analytics.client";
import {NovaSpatialClient} from "./clients/nova-spatial.client";
import {NgTranslateTranslatorService} from "./services/nova-translator.service";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        FetchDataComponent,
        HomeComponent,
        MagicInputComponent
    ],
    providers: [
        GeoLocation,
        AnalyticsService,
        ToastyNotificationsService,
        NotificationsService,
        {provide: ErrorHandler, useClass: AppErrorHandler}
    ],
    entryComponents: [
        MagicInputComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
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
            },
            WorkflowEventConfig,
            EventConfig
        ),
        ToastyModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, './assets/i18n', '.json'),
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
            }
        ),
        RouterModule.forRoot([
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'fetch-data', component: FetchDataComponent},
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