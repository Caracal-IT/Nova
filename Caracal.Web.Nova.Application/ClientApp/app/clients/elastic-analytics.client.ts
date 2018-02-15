import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AnalyticsClient} from "nova-analytics";

@Injectable()
export class ElasticAnalyticsClient extends AnalyticsClient {
    constructor(
        private http: HttpClient
    ){
        super();
    }

    indexDocument(document: any): Observable<any>{
        return this.http
            .post("/api/analytics", document);
    } 
}