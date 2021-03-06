import {Component} from '@angular/core';

@Component({
    selector: 'magic-input',
    template: `
      <div class="form-group">
        <label [for]="config.name">{{config.label|translate:model}}</label>
        <input
          style="background-color: lightseagreen"           
          class="form-control" 
          [id]="config.name"
          [(ngModel)]="model[config.name]"
          placeholder="{{config.placeholder|translate:model}}">
      </div>
  `
})
export class MagicInputComponent {
    config: any;
    model: any;
    wf: any;
}