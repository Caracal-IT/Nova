import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "ng2-translate";
import {ModuleWithProviders, NgModule} from "@angular/core";

import {PaperPasswordComponent} from "./components/paper-password/paper-password.component";

import {
    DynamicFormModule,
    ComponentService,
    DynamicFormService, DynamicFormComponent
} from "nova-forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        DynamicFormModule.forRoot()
    ],
    declarations: [
        PaperPasswordComponent
    ],
    entryComponents: [
        DynamicFormComponent,
        PaperPasswordComponent
    ]
})
export class PaperModule {
    private static addComponents(){
        ComponentService.add("paper-password", PaperPasswordComponent);
    }
    
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: PaperModule,
            providers: [
                DynamicFormService
            ]
        };
    }

    public static registerComponents() {
        DynamicFormModule.registerComponents();
        PaperModule.addComponents();
    }
}