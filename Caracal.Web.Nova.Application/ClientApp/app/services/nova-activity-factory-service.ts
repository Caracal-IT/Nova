import {ActivityFactoryService, Activity} from "nova-workflow";

export class NovaActivityFactoryService extends ActivityFactoryService {
    private NovaAlertActivity(metadata: any) {
        return new NovaAlertActivity(metadata);
    }
}

export class NovaAlertActivity extends Activity {
    nextActivity = "";
    message = "";
    title = "Success";
    style = "success";
    
    constructor(metadata: any) {
        super();
        Activity.mapAllFields(metadata, this);
    }

    execute(parameters: any) {
        (<any>this.notificationService)[this.style](this.title, this.message);
        this.workflow.next(this.nextActivity);
    }
}