import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as applicationSettings from "application-settings";
import { Page } from 'ui/page';
import * as moment from "moment";

@Component({
  selector: "list",
  templateUrl: "pages/list/list.component.html",
})
export class ListPage {

    private timeString = applicationSettings.getNumber("hour") + ":" + applicationSettings.getNumber("minute");
    alarmTime = moment(this.timeString, "HH:mm").format("HH:mm");

}
