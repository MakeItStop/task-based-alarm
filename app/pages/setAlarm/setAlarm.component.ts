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
  private _plusDays = 0;

  configureTime(timePicker: TimePicker) {
    timePicker.hour = applicationSettings.getNumber("hour", 9);
    timePicker.minute = applicationSettings.getNumber("minute", 25);

  }

  saveTime(timePicker: TimePicker) {
    applicationSettings.setNumber("hour", timePicker.hour);
    applicationSettings.setNumber("minute", timePicker.minute);
    let selectedTime = moment(timePicker.hour + ':' + timePicker.minute, "HH:mm")
    if (selectedTime < moment()) {
      this._plusDays = 1;
    } else {
      this._plusDays = 0;
    }

    applicationSettings.setNumber("today", this._plusDays);

    this._router.navigate(["list"]);
  }

}
