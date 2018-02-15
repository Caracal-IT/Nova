import {
    SimpleChanges,
    Component, ContentChild, ElementRef, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/from';
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'nova-input',
    template: `
      <div class="form-group">
        <label [for]="config.name">{{config.label|translate:model}}</label>
        <input
          style="background-color: lightpink"           
          class="form-control" 
          [id]="config.name"
          [(ngModel)]="model[config.name]"
          placeholder="{{config.placeholder|translate:model}}">
      </div>
  `,
    
})
export class NovaInputComponent {
    label: any;
    
    constructor(private translate: TranslateService){
        
    }
    
    ngOnInit(){
        this.label = this.config.label;
    }
    
    
    ngDoCheck(){
        
        //this.config.label = this.stringInject(this.label, this.model)||"";
        //this.config.label =  this.translate.parser.interpolate(this.label, this.model);
        //this.config.label =  this.translate.parser.interpolate(this.label, this.model);
        /*
        if (this.label)
            this
                .translate
                .get(this.label.toString(), this.model)
                .take(1)
                .subscribe(translation => {
                    console.log("translate");
                    this.config.label = this.translate.parser.interpolate(translation, this.model);
                });
                */
    }
    
    config: any;
    model: any;
    wf: any;
}