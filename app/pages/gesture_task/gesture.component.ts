import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { SwipeGestureEventData, PinchGestureEventData, RotationGestureEventData } from "ui/gestures";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
    selector: "gesture",
    templateUrl: "pages/gesture_task/gesture.component.html",
    // styleUrls : ['gesture.component.css']
})
export class GesturePage implements OnInit {
  private counter: number = 4;
  private taskPassed = false;
  private longPress = false;
  private swipeLeft = false;
  private pinch = false;
  private rotate = false;
  private alarmLooper = {};
  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {}

  private _taskStop() {
    if (this.longPress && this.swipeLeft && this.pinch && this.rotate === true) {
      this._stopAlarm();
      timer.setTimeout(() => {
         this._router.navigate([""]) }, 500);
    }
  }

  public get message1() : string {
    if (this.longPress === true) {
      return "Success!!"
    }
  }

  public get message2() : string {
    if (this.swipeLeft === true) {
      return "Success!!"
    }
  }

  public get message3() : string {
    if (this.pinch === true) {
      return "Success!!"
    }
  }

  public get message4() : string {
    if (this.rotate === true) {
      return "Success!!"
    }
  }

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
    this._taskStop()
    this.longPress = true;
  }

  onSwipe(args: SwipeGestureEventData) {
    if (args.direction === 2) {
      this.swipeLeft = true;
      this._taskStop()
    }
  }

  onPinch(args: PinchGestureEventData) {
    this.pinch = true;
    this._taskStop()
  }

  onRotate(args: RotationGestureEventData) {
    if (args.rotation > 89) {
      this.rotate = true;
      this._taskStop()
    }
  }
}
