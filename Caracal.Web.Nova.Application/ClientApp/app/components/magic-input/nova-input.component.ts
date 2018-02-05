import {Component} from '@angular/core';

@Component({
    selector: 'magic-input',
    template: `
      <div class="form-group">
        <label [for]="config.name">{{config.label|translate}}</label>
        <input
          style="background-color: hotpink"           
          class="form-control" 
          [id]="config.name"
          [(ngModel)]="model[config.name]"
          placeholder="{{config.placeholder|translate}}">
      </div>
  `
})
export class MagicInputComponent {
    config: any;
    model: any;
    wf: any;
}