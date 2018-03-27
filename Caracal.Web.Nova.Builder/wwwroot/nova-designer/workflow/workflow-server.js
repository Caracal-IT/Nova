class WorkflowServer {
    constructor(view, factory){
        this.view = view;
        this.factory = factory;
    }
    
    publish() {
        //var writer = new draw2d.io.json.Writer();
        //writer.marshal(this.view, function(json){
          //  console.log(JSON.stringify(json,null,2));
        //});
        
        let builder = new ProcessBuilder(this.view);
        let process = builder.build();
        
        console.log(process);

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/Designer/Publish/registration', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // send the collected data as JSON
        xhr.send(JSON.stringify(process));

        xhr.onload = function(e) {
            alert(xhr.statusText); // not responseText
            /* ... */
        };
    }
    
    getProcess(){
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Designer/Shapes/registration', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // send the collected data as JSON
        xhr.send();
        
        return new Promise(resolve => {
            xhr.onload = function(e) {
                let process = "";
                
                if (xhr.responseText.length) 
                    process = JSON.parse(xhr.responseText);
                
                resolve(process);
            };
        });
    }
    
    async load(){
        const process = await this.getProcess();
        
        if (process) 
           ProcessParser.Parse(process, this.view, this.factory);
    }
    
    controls(){
        return controls;
    }
}