import {Component} from '@angular/core';

@Component({
    selector: 'nova-input',
    template: `
      <div class="form-group">
        <label [for]="config.name">{{config.label|translate:model}}</label>
        <input
          style="background-color: lightgoldenrodyellow"           
          class="form-control" 
          [id]="config.name"
          [(ngModel)]="model[config.name]"
          placeholder="{{config.placeholder|translate:model}}">
      </div>
  `,
    
})
export class NovaInputComponent {
    config: any;
    model: any;
    wf: any;
}