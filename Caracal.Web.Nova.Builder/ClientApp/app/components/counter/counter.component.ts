import {Component, ViewChild} from '@angular/core';

@Component({
    selector: 'counter',
    styleUrls: ['./counter.component.css'],
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    @ViewChild('myProfile') myProfile: any
    canvas: any;
    
    iframeLoadedCallBack(){
        this.canvas = this.myProfile.nativeElement.contentWindow.GetCanvas();

        //this.createHeader();
        //this.createRequiredPasswordPanel();
        //this.createConfirmPasswordPanel();
    }
    
    createHeader(){
        const header = "Forgot Password";
        const subTitle = "This process will enable to user to request a password reset.\nThe reset link will be mailed to him.";

        this.canvas.title(header, 0, 0);
        this.canvas.label(subTitle, 10, 70);
    }
    
    createRequiredPasswordPanel(){
        this.canvas.panel("Request Password", 30, 125, 730, 150);
        this.canvas.start(50, 210);
        this.canvas.form("Forgot Password", 200, 150);
        this.canvas.email("Sent Password Mail", 530, 160);

        this.canvas.note("The user needs to reset his requested\npassword form the email.", 660, 170);

    }
    
    createConfirmPasswordPanel() {
        this.canvas.panel("Confirm Password", 30, 320, 730, 170);
        this.canvas.resume("Respond To Email", 80, 390);
        this.canvas.form("Confirm Password", 240, 350);
        this.canvas.webService("Save New Password", 560, 370);
        this.canvas.end(690, 435);
    }
}