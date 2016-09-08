let timer = require('timer');
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as applicationSettings from "application-settings";
import { Page } from 'ui/page';
import * as moment from "moment";

@Component({
  selector: "list",
  templateUrl: "pages/list/list.component.html",
})
export class ListPage {

  private _timeString = applicationSettings.getNumber("hour") + ":" + applicationSettings.getNumber("minute");
  private _now = moment().format("HH:mm");
  private _until = moment(this._timeString, "HH:mm").diff(moment());


  alarmTime = moment(this._timeString, "HH:mm").format("HH:mm");

  startTimer() {
    timer.setTimeout(() => {
      alert(moment(this._until).format("HH:mm"));
    }, 1000)
  }

}
