import {Component, OnInit} from '@angular/core';
import {NovaTranslationsService} from "nova-forms";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    language = "en";
    
    constructor(
        private translate: NovaTranslationsService
    ) { }
    
    ngOnInit(){
        this.language = this.translate.currentLang;
    }

    changeLanguage(lang: string){
        this.translate.use(lang);
        
        this.language = lang;
    }
}
