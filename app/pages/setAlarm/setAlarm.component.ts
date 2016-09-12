import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { TimePicker } from "ui/time-picker";
import { ListPicker } from "ui/list-picker";
import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Page } from "ui/page";

let taskList = ["task1","task2","task3"]

@Component({
  selector: "setAlarm",
  templateUrl: "pages/setAlarm/setAlarm.component.html",
})
export class SetAlarmPage {
  private _plusDays = 0;
  public tasks: Array<string>;

  constructor(private _router: Router) {
    this.tasks = [];

    for (let i = 0; i < taskList.length; i++) {
      this.tasks.push(taskList[i]);
    }
  }

  public selectedIndexChanged(picker) {
    console.log('picker selection: ' + picker.selectedIndex);
  }

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

    applicationSettings.setNumber("plusDays", this._plusDays);

    this._router.navigate(["slide"]);
  }

}
