class WorkflowServer {
    constructor(view, factory){
        this.view = view;
        this.factory = factory;
    }
    
    publish() {
        let builder = new ProcessBuilder(this.view);
        let process = builder.build();
        
        console.log(process);

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/Designer/Publish/registration', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // send the collected data as JSON
        xhr.send(JSON.stringify(process));

        xhr.onload = function(e) {
           // alert(xhr.statusText); // not responseText
            /* ... */
        }
    }
    
    getProcess(){
        return process;
    }
    
    load(){
        ProcessParser.Parse(this.getProcess(), this.view, this.factory);
    }
    
    controls(){
        return controls;
    }
}