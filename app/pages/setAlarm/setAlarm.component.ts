import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { TimePicker } from "ui/time-picker";
import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
// import { Alarm } from "../../shared/alarm/alarm";
// import { EventData } from 'data/observable'
// import {TextField} from "ui/text-field";
// import { Page } from 'ui/page'

@Component({
    selector: "setAlarm",
    templateUrl: "pages/setAlarm/setAlarm.component.html",
})
export class SetAlarmPage {

  constructor(private _router: Router) {}

  configureTime(timePicker: TimePicker) {
    timePicker.hour = applicationSettings.getNumber("hour", 9);
    timePicker.minute = applicationSettings.getNumber("minute", 25);
  }

  saveTime(timePicker: TimePicker) {
    // alert("You have selected " + timePicker.hour + ':' + timePicker.minute)
    applicationSettings.setNumber("hour", timePicker.hour);
    applicationSettings.setNumber("minute", timePicker.minute);
    this._router.navigate(["list"]);
  }

}
