import {Component, OnInit} from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    language = "en";
    status = "online";

    constructor(private translate: TranslateService) { }

    ngOnInit() {
        this.language = this.translate.currentLang;
        
        window.addEventListener("online", (event) => this.status = event.type,true);        
        window.addEventListener("offline", (event) => this.status = event.type,true);        
    }
    
    changeLanguage(lang: string) {
        this.translate.use(lang);

        this.language = lang;
    }
}