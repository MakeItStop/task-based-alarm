let timer = require('timer');
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as applicationSettings from "application-settings";
import { Page } from 'ui/page';
import { Router } from "@angular/router";
import * as moment from "moment";

let taskList = ["tap","maths","slider", "gesture", "memory"];

@Component({
  selector: "list",
  templateUrl: "pages/list/list.component.html",
  styleUrls: ["pages/list/list.component.css"]
})
export class ListPage implements OnInit {

  constructor(private _router: Router) {}

  public selectedTask = this._getTask();
  private _timeString = applicationSettings.getNumber("hour") + ":" + applicationSettings.getNumber("minute");
  private _now = moment();
  private _plusDays = applicationSettings.getNumber("plusDays")
  private _alarmTime = moment(this._timeString, "HH:mm").add(this._plusDays, 'd')
  private _until = this._alarmTime.diff(this._now);

  public formattedAlarmTime = moment(this._timeString, "HH:mm").format("HH:mm");

  private _getTask(){
    let task = applicationSettings.getString("task", "tap");
    if (task === 'random') {
      return this._getRandomItemFrom(taskList);
    }
    return task;
  }

  private _getRandomItemFrom(array) {
    let randomIndex = Math.floor(Math.random() * (array.length - 1));
    return array[randomIndex];
  }

  ngOnInit() {
    global.alarmTimer ? this._clearAlarm() : this._startAlarmTimer();
  }

  private _clearAlarm() {
    timer.clearTimeout(global.alarmTimer);
  }

  private _startAlarmTimer() {
    global.alarmTimer = timer.setTimeout(() => {
      this.triggerAlarm();
    }, this._until)
  }
  public triggerAlarm() {
    this._router.navigate([this.selectedTask]);
  }

}
