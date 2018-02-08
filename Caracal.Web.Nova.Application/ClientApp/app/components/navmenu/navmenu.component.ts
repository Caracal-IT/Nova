import {Component, OnInit} from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    language = "en";

    constructor(private translate: TranslateService) {
    }

    ngOnInit() {
        this.language = this.translate.currentLang;
    }

    changeLanguage(lang: string) {
        this.translate.use(lang);

        this.language = lang;
    }
}