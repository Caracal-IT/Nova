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
    TranslateModule,
    TranslateStaticLoader
} from "ng2-translate";
import {PaperModule} from "nova-paper";
import {DynamicFormModule, DynamicFormService} from "nova-forms";
import {
    WorkflowModule,
    WorkflowComponent,
    NotificationsService,
    NovaFormService
} from 'nova-workflow';
import {NovaModule} from "../nova/nova.module";
import {MagicInputComponent} from "./components/magic-input/nova-input.component";
import {AnalyticsService} from "./services/analytics.service";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        FetchDataComponent,
        HomeComponent,
        MagicInputComponent
    ],
    providers: [
        AnalyticsService,
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
        DynamicFormModule,
        PaperModule,
        NovaModule,
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
        var components = [];
        components.push({key: "magic-input", component: MagicInputComponent});
        
        DynamicFormModule.registerComponents();
        DynamicFormModule.addModules(PaperModule.getComponents());
        DynamicFormModule.addModules(NovaModule.getComponents());
        DynamicFormModule.addModules(components);        
    }
}

export class WFEventConfig {
    static getEvents(){
        return [
            {
                key: "wf-created", 
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"}
                ]
            },
            {
                key: "wf-loading",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"}
                ]
            },
            {
                key: "wf-loaded",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"}
                ]
            },
            {
                key: "wf-changing-state",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"},
                    {name: "wf_act_name", key: "detail.actName"},
                    {name: "wf_act_type", key: "detail.actType"}
                ]
            },
            {
                key: "wf-changed-state",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"},
                    {name: "wf_act_name", key: "detail.actName"},
                    {name: "wf_act_type", key: "detail.actType"}
                ]
            },
            {
                key: "wf-activity-not-found",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"},
                    {name: "wf_act_name", key: "detail.actName"}
                ]
            }
        ];
    }
}

export class EventConfig {
    static getEvents(){
        return [
            {
                key: "online"
            },
            {
                key: "offline"
            },
            {
                key: "load",                
                fields: [
                    {name: "url", key: "currentTarget.location.href"},                    
                    {name: "userAgent", key: "currentTarget.clientInformation.userAgent"},                   
                    {name: "height", key: "currentTarget.outerHeight"},
                    {name: "width", key: "currentTarget.outerWidth"},
                    {name: "devicePixelRatio", key: "currentTarget.devicePixelRatio"},
                    {name: "connectionStart", key: "currentTarget.performance.timing.connectStart"},
                    {name: "connectionEnd", key: "currentTarget.performance.timing.connectEnd"},
                    {name: "domComplete", key: "currentTarget.performance.timing.domComplete"},
                    {name: "availHeight", key: "currentTarget.screen.availHeight"},
                    {name: "availWidth", key: "currentTarget.screen.availWidth"}
                ]
            },
            {
                key: "pageshow"                
            },
            {
                key: "focus",
                constraints: [                    
                    {key: "srcElement.localName", values: "input", type: "contains"}
                ],
                fields: [
                    {name: "name", key: "srcElement.id"}                    
                ]
            },
            {
                key: "blur",
                constraints: [                    
                    {key: "srcElement.localName", values: "input", type: "contains"}
                ],
                fields: [
                    {name: "name", key: "srcElement.id"}                    
                ]
            },
            {
                key: "change",                
                fields: [
                    {name: "name", key: "srcElement.id"},                   
                    {name: "isValid", key: "srcElement.validity.valid"}                    
                ]
            },
            {
                key: "error",
                fields: [
                    {name: "error_message", key: "error.message"},
                    {name: "error_stacktrace", key: "error.stack"}
                ]
            },
            {
                key: "custom-error",
                fields: [
                    {name: "error_message", key: "detail.error.message"}, 
                    {name: "error_stacktrace", key: "detail.error.stack"}
                ]
            }
            
        ];
    }
}

AnalyticsService.addEvents(WFEventConfig.getEvents());
//AnalyticsService.addEvents(EventConfig.getEvents());