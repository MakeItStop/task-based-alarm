import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as applicationSettings from "application-settings";
import { Page } from 'ui/page';
import * as moment from "moment";

@Component({
  selector: "list",
  templateUrl: "pages/list/list.component.html",
})
export class ListPage {

  private _now = moment().get('h') + ":" + moment().get('m');
  private _until;

  private _timeString = applicationSettings.getNumber("hour") + ":" + applicationSettings.getNumber("minute");

  alarmTime = moment(this._timeString, "HH:mm").format("HH:mm");

}
