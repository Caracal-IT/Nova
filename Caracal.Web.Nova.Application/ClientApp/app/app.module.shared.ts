import {ErrorHandler, NgModule} from '@angular/core';
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

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        FetchDataComponent,
        HomeComponent,
        MagicInputComponent
    ],
    providers: [
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
        DynamicFormModule.forRoot(),
        PaperModule,
        NovaModule,
        ToastyModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader, // './assets/i18n'   ./api/localize
            useFactory: ((http: Http) => new TranslateStaticLoader(http, './assets/i18n', '.json')),
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