export class WorkflowEventConfig {
    static getEvents(){
        return [
            
            {
                key: "wf-created",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"}
                ]
            },
            {
                key: "wf-loading",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"}
                ]
            },
            {
                key: "wf-loaded",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"}
                ]
            },
            {
                key: "wf-changing-state",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"},
                    {name: "wf_act_name", key: "detail.actName"},
                    {name: "wf_act_type", key: "detail.actType"}
                ]
            },
            {
                key: "wf-changed-state",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"},
                    {name: "wf_act_name", key: "detail.actName"},
                    {name: "wf_act_type", key: "detail.actType"}
                ]
            },
            {
                key: "wf-activity-not-found",
                fields: [
                    {name: "wf_workflowId", key: "detail.workflowId"},
                    {name: "wf_name", key: "detail.name"},
                    {name: "wf_act_name", key: "detail.actName"}
                ]
            }
        ];
    }
}