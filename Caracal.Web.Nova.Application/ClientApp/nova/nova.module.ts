import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "ng2-translate";
import {ModuleWithProviders, NgModule} from "@angular/core";

import {NovaInputComponent} from "./components/nova-input/nova-input.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule
    ],
    declarations: [
        NovaInputComponent
    ],
    entryComponents: [
        NovaInputComponent
    ]
})
export class NovaModule {
    public static getComponents(){
        var components = new Array<{key: string, component: any}>();
        components.push({key: "nova-input", component: NovaInputComponent});

        return components;
    }    
}