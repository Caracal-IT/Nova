import { Component } from '@angular/core';

@Component({
  selector: 'paper-password',
  template: `
      <div class="form-group">
        <label [for]="config.name">{{config.label|translate}}</label>
        <input 
          type="password" 
          class="form-control" 
          [id]="config.name"
          [(ngModel)]="model[config.name]"
          placeholder="{{config.placeholder|translate}}">
      </div>
  `
})
export class PaperPasswordComponent {
  config: any;
  model: any;
  wf: any;
}
