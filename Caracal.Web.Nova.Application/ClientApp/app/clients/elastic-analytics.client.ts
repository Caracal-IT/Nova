import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AnalyticsClient, EventService} from "nova-analytics";
import {EventConfig} from "../config/event.config";
import {WorkflowEventConfig} from "../config/workflow.event.config";

@Injectable()
export class ElasticAnalyticsClient extends AnalyticsClient {
    constructor(
        private http: HttpClient,
        private events: EventService
    ){
        super();
        events.addEvents(EventConfig.getEvents());
        events.addEvents(WorkflowEventConfig.getEvents());
    }

    indexDocument(document: any): Observable<any>{
        return this.http
            .post("/api/analytics", document);
    } 
}