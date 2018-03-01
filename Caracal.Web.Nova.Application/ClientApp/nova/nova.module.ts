import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "ng2-translate";
import {NgModule} from "@angular/core";

import {NovaInputComponent} from "./components/nova-input/nova-input.component";
import {NovaSelectComponent} from "./components/nova-select/nova-select.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule.forRoot()
    ],
    declarations: [
        NovaInputComponent,
        NovaSelectComponent
    ],
    entryComponents: [
        NovaInputComponent,
        NovaSelectComponent
    ]
})
export class NovaModule {
    public static getComponents() {
        const components = [];
        components.push({key: "nova-input", component: NovaInputComponent});
        components.push({key: "nova-select", component: NovaSelectComponent});
        
        return components;
    }
}