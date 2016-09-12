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

  private _success() {
    return "Success!!"
  }

  public get longPressMessage() : string {
    if (!this.longPress) {
      return "Press and hold here";
    } else {
      return "Success!!";
    }
  }

  public get swipeMessage() : string {
    if (!this.swipeLeft) {
      return "Swipe LEFT here"
    } else {
      return "Success!!";
    }
  }

  public get pinchMessage() : string {
    if (!this.pinch) {
      return "Pinch here"
    } else {
      return "Success!!";
    }
  }

  public get rotateMessage() : string {
    if (!this.rotate) {
      return "Rotate here"
    } else {
      return "Success!!";
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
