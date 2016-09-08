import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { TimePicker } from "ui/time-picker";
import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
import * as moment from "moment";


@Component({
    selector: "setAlarm",
    templateUrl: "pages/setAlarm/setAlarm.component.html",
})
export class SetAlarmPage {

  constructor(private _router: Router) {}
  private _today = 0;

  configureTime(timePicker: TimePicker) {
    timePicker.hour = applicationSettings.getNumber("hour", 9);
    timePicker.minute = applicationSettings.getNumber("minute", 25);

  }

  saveTime(timePicker: TimePicker) {
    applicationSettings.setNumber("hour", timePicker.hour);
    applicationSettings.setNumber("minute", timePicker.minute);
    if (moment().hour() > timePicker.hour && moment().minute() > timePicker.minute) {
      this._today = 1;
    }

    applicationSettings.setNumber("today", this._today);

    this._router.navigate(["list"]);
  }

}
