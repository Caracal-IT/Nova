import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {TranslateService} from "ng2-translate";
import {NovaTranslatorService} from "nova-forms";

@Injectable()
export class NgTranslateTranslatorService extends NovaTranslatorService {
    constructor(private translate: TranslateService){
        super();
    }
    
    get(key: string, interpolateParams: any|undefined): Observable<string|any>{
        return this
                .translate
                .get(key, interpolateParams);
    }

    interpolate(expr: string, params?: any): string{
        return this.translate.parser.interpolate(expr, params);
    }
}