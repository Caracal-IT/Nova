import { Component } from '@angular/core';

@Component({
  selector: 'nova-input',
  template: `
      <div class="form-group">
        <label [for]="config.name">{{config.label|translate}}</label>
        <input
          style="background-color: lightpink"           
          class="form-control" 
          [id]="config.name"
          [(ngModel)]="model[config.name]"
          placeholder="{{config.placeholder|translate}}">
      </div>
  `
})
export class NovaInputComponent {
  config: any;
  model: any;
  wf: any;
}
