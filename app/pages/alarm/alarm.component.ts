import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
    selector: "alarm",
    templateUrl: "pages/alarm/alarm.component.html",
})
export class AlarmPage implements OnInit {
  public counter: number = 16;
  private taskPassed = false;
  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {}

  public get message(): string{
    if (this.counter > 0) {
      return this.counter + " taps left";
    } else {
      this.taskPassed = true;
      return "You are awake"
    }
  }

  public playAlarm() {
    // SOLUTION 1: DOES NOT WORK
    // while (!this.taskPassed) {
    //   this.sounds["Warning"].play();
    // }
    // SOLUTION 2: ALSO DOES NOT WORK
    // this.sounds["Warning"].play();
    // timer.setTimeout(this.playAlarm, 10000)
    // SOLUTION 3: ???


    this.sounds["Warning"].play();
    timer.setInterval(() => {
      this.sounds["Warning"].play();
    }, 10000);
  }

  ngOnInit() {
    this.playAlarm();

  }

  onTap() {
    if (!this.taskPassed) {
      this.counter--;
    } else {
      this.sounds["Warning"].stop();
      this._router.navigate([""]);
    }
  }

}
