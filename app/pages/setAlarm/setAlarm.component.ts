import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { TimePicker } from "ui/time-picker";
import { Alarm } from "../../shared/alarm/alarm";
// import { EventData } from 'data/observable'
// import {TextField} from "ui/text-field";
// import { Page } from 'ui/page'



@Component({
    selector: "setAlarm",
    templateUrl: "pages/setAlarm/setAlarm.component.html",
})
export class SetAlarmPage {
  alarm: Alarm;

  constructor() {
    this.alarm = new Alarm();
  }

  configureTime(timePicker: TimePicker) {
    timePicker.hour = 9;
    timePicker.minute = 25;
  }

  saveTime(timePicker: TimePicker) {
    alert("You have selected " + timePicker.hour + ':' + timePicker.minute)
    this.alarm.hour = timePicker.hour;
    this.alarm.minute = timePicker.minute;
    console.log(this.alarm.hour)
    console.log(this.alarm.minute)
  }

}
