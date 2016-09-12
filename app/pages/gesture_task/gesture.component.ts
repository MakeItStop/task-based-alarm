import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { SwipeGestureEventData, PinchGestureEventData, RotationGestureEventData } from "ui/gestures";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
    selector: "gesture",
    templateUrl: "pages/gesture_task/gesture.component.html",
})
export class GesturePage implements OnInit {
  private counter: number = 4;
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

  public playAlarm() {
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

  onLongPress() {
    console.log("LongPress!");
    this.counter--;
  }

  onSwipe(args: SwipeGestureEventData) {
      if (args.direction === 2) {
        this.counter--;
      }
  }

  onPinch(args: PinchGestureEventData) {
    this.counter--;
    console.log("Pinch scale: " + args.scale + " state: " + args.state);
    this._stopAlarm();
    this._router.navigate([""]);
  }

  onRotate(args: RotationGestureEventData) {
    this.counter--;
    console.log("Rotate angle: " + args.rotation + " state: " + args.state);
    this._stopAlarm();
    this._router.navigate([""]);
  }

}
