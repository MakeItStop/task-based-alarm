import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
    selector: "gesture",
    templateUrl: "pages/gesture_task/gesture.component.html",
})
export class GesturePage implements OnInit {
  private taskPassed = false;
  private alarmLooper = {};
  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {}

  // public get message(): string{
  //   if (this.counter > 0) {
  //     return this.counter + " taps left";
  //   } else {
  //     this.taskPassed = true;
  //     return "You are awake"
  //   }
  // }

  public playAlarm() {
    // let alarmArray = Object.keys(this.sounds)
    // let randomAlarm = alarmArray[Math.floor(Math.random() * alarmArray.length)]
    this.sounds["Railroad"].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds["Railroad"].play();
    }, 10000);
  }

  private _stopAlarm() {
    this.sounds["Railroad"].stop();
    timer.clearInterval(this.alarmLooper);
  }

  ngOnInit() {
    this.playAlarm();
  }

  // onPan(args: PanGestureEventData) {
  //   console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
  // }

  onLongPress() {
    console.log("LongPress!");
    this._stopAlarm();
    this._router.navigate([""]);
  }

}
