import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { TimePicker } from "ui/time-picker";
import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Page } from "ui/page";

@Component({
  selector: "setAlarm",
  templateUrl: "pages/setAlarm/setAlarm.component.html",
})

export class SetAlarmPage {

  constructor(private _router: Router) {

    if (applicationSettings.getString("task") === "") {
      applicationSettings.setString("task", "tap");
    }
  }

  public configureTime(timePicker: TimePicker) {
    timePicker.hour = applicationSettings.getNumber("hour", 9);
    timePicker.minute = applicationSettings.getNumber("minute", 25);

  }

  public saveTime(timePicker: TimePicker) {
    this._storeNumber("hour", timePicker.hour);
    this._storeNumber("minute", timePicker.minute);
    this._storeNumber("plusDays", this._plusDays(timePicker));
    this._routeToList();
  }

  private _plusDays(timePicker) {
    let selectedTime = moment(timePicker.hour + ':' + timePicker.minute, "HH:mm");
    return this._isSelectedTimeTomorrow(selectedTime) ? 1 : 0;
  }

  private _isSelectedTimeTomorrow(selectedTime) {
    return selectedTime < moment()
  }

  private _storeNumber(attribute, value) {
    applicationSettings.setNumber(attribute, value);
  }


  private _routeToList() {
    this._router.navigate(["list"]);
  }

  public routeToSettings() {
    this._router.navigate(["settings"])
  }

}
