import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { TimePicker } from "ui/time-picker";
import { ListPicker } from "ui/list-picker";
import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Page } from "ui/page";

let taskList = ["alarm","math-game","slide", "gesture", "memory"]

@Component({
  selector: "setAlarm",
  templateUrl: "pages/setAlarm/setAlarm.component.html",
})
export class SetAlarmPage {
  private _currentTask = "taskholder";
  public tasks: Array<string>;

  constructor(private _router: Router) {
    this.tasks = [];

    for (let i = 0; i < taskList.length; i++) {
      this.tasks.push(taskList[i]);
    }
  }

  public selectedIndexChanged(picker) {
    this._currentTask = taskList[picker.selectedIndex];
    this._currentTask = this._currentTask || "alarm";
    this._storeString("task", this._currentTask);
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
    let selectedTime = this._convertToMoment(timePicker.hour + ':' + timePicker.minute, "HH:mm");
    return this._isSelectedTimeTomorrow(selectedTime) ? 1 : 0;
  }

  private _convertToMoment(timeString, format) {
    return moment(timeString, format);
  }

  private _isSelectedTimeTomorrow(selectedTime) {
    return selectedTime < moment()
  }

  private _storeNumber(attribute, value) {
    applicationSettings.setNumber(attribute, value);
  }
  private _storeString(attribute, value) {
    applicationSettings.setString(attribute, value);
  }

  private _routeToList() {
    this._router.navigate(["list"]);
  }

}
