export class EventConfig {
    static getEvents() {
        return [
            {
                key: "online"
            },
            {
                key: "offline"
            },
            {
                key: "load",
                fields: [
                    {name: "url", key: "currentTarget.location.href"},
                    {name: "userAgent", key: "currentTarget.clientInformation.userAgent"},
                    {name: "height", key: "currentTarget.outerHeight"},
                    {name: "width", key: "currentTarget.outerWidth"},
                    {name: "devicePixelRatio", key: "currentTarget.devicePixelRatio"},
                    {name: "connectionStart", key: "currentTarget.performance.timing.connectStart"},
                    {name: "connectionEnd", key: "currentTarget.performance.timing.connectEnd"},
                    {name: "domComplete", key: "currentTarget.performance.timing.domComplete"},
                    {name: "availHeight", key: "currentTarget.screen.availHeight"},
                    {name: "availWidth", key: "currentTarget.screen.availWidth"}
                ]
            },
            {
                key: "pageshow"
            },
            {
                key: "focus",
                constraints: [
                    {key: "srcElement.localName", values: "input", type: "contains"}
                ],
                fields: [
                    {name: "name", key: "srcElement.id"}
                ]
            },
            {
                key: "blur",
                constraints: [
                    {key: "srcElement.localName", values: "input", type: "contains"}
                ],
                fields: [
                    {name: "name", key: "srcElement.id"}
                ]
            },
            {
                key: "change",
                fields: [
                    {name: "name", key: "srcElement.id"},
                    {name: "isValid", key: "srcElement.validity.valid"}
                ]
            },
            {
                key: "error",
                fields: [
                    {name: "error_message", key: "error.message"},
                    {name: "error_stacktrace", key: "error.stack"}
                ]
            },
            {
                key: "custom-error",
                fields: [
                    {name: "error_message", key: "detail.error.message"},
                    {name: "error_stacktrace", key: "detail.error.stack"}
                ]
            }

        ];
    }
}