import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.sass"]
})
export class NavbarComponent implements OnInit {

    @Output() onToggle = new EventEmitter();
    @Input() header!: string;
    @Input() isDrawerOpened!: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggle() {
        const element = document.getElementById("menu-icon");
        this.onToggle.emit(true);
        if (element && this.isDrawerOpened) {
            element.style.transform = "rotate(180deg)";
        }

        if (element && !this.isDrawerOpened) {
            element.style.transform = "rotate(0deg)";
        }
    }
}
