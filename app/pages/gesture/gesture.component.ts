import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { SwipeGestureEventData, PinchGestureEventData, RotationGestureEventData } from "ui/gestures";
import * as applicationSettings from "application-settings";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
    selector: "gesture",
    templateUrl: "pages/gesture/gesture.component.html",
    // styleUrls : ['gesture.component.css']
})
export class GesturePage implements OnInit {
  private longPress = false;
  private swipeLeft = false;
  private pinch = false;
  private rotate = false;
  private alarmLooper = {};
  private currentSound = applicationSettings.getString("sound");
  private sounds: any = {
    "Foghorn": [sound.create("~/sounds/Foghorn.mp3"), 5100],
    "Alarm": [sound.create("~/sounds/Alarm_Clock.mp3"),21100],
    "Bomb_Siren": [sound.create("~/sounds/Bomb_Siren.mp3"),21100],
    "Railroad": [sound.create("~/sounds/Railroad.mp3"),45100],
    "Warning": [sound.create("~/sounds/Warning.mp3"),39100]
  };

  constructor(private _router: Router) {}

  private _taskStop() {
    if (this.longPress && this.swipeLeft && this.pinch && this.rotate === true) {
      this._stopAlarm();
      timer.setTimeout(() => {
         this.routeToHome() }, 500);
    }
  }

  routeToHome(){
    this._router.navigate([""]);
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
    this.sounds[this.currentSound][0].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds[this.currentSound][0].play();
    }, this.sounds[this.currentSound][1]);
  }

  private _stopAlarm() {
    this.sounds[this.currentSound][0].stop();
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
