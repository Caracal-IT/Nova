import {Component} from '@angular/core';

@Component({
    selector: 'nova-select',
    template: `
      <div class="form-group">
          <label [for]="config.name">{{config.label|translate:model}}</label>
          <select          
            style="background-color: lightgoldenrodyellow"
            class="form-control"
            [id]="config.name"
            [(ngModel)]="model[config.name]"
          >
              <option selected disabled="disabled" value="undefined">{{config.placeholder|translate:model}}</option>
              <option *ngFor="let item of config.items" [value]="item.value">{{item.key}}</option>
          </select>          
      </div>
  `,

})
export class NovaSelectComponent {
    config: any;
    model: any;
    wf: any;
}