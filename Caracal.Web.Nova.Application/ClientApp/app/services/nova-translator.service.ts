import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {TranslateService} from "ng2-translate";
import {NovaTranslatorService} from "nova-forms";

import { map, take } from 'rxjs/operators';

@Injectable()
export class NgTranslateTranslatorService extends NovaTranslatorService {
    constructor(private translate: TranslateService){
        super();
    }
    
    get(key: string, interpolateParams: any|undefined): Observable<string|any>{
        const translatedString = this.translate.get(key, interpolateParams);
  
        return translatedString
            .take(1)
            .map((value) => {
                console.log(value);
                if(typeof value === "object")
                    return this.interpolate(key, interpolateParams);
                
                if (key === value)
                    return  this.interpolate(key, interpolateParams);
            
                return value;
            });
    }

    interpolate(expr: string, params?: any): string{
        return this.translate.parser.interpolate(expr, params);
    }
}