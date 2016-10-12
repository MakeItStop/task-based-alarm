import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { SwipeGestureEventData, PinchGestureEventData, RotationGestureEventData } from "ui/gestures";
import { SoundService } from "../../shared/soundService";
import * as applicationSettings from "application-settings";

let timer = require('timer');

@Component({
    selector: "gesture",
    templateUrl: "pages/gesture/gesture.component.html",
    providers: [SoundService],
    styleUrls: ["pages/gesture/gesture.component.css"]
})
export class GesturePage implements OnInit {
  private _difficulty = Math.ceil((applicationSettings.getNumber("memoryDifficulty", 10) / 2));
  private longPressCounter = this._difficulty;
  private swipeLeftCounter = this._difficulty;
  private pinchCounter = this._difficulty;
  private rotateCounter = this._difficulty;

  constructor(private _router: Router, private _soundModule: SoundService) {}

  private _taskStop() {
    if (this._allCountersAtZero()) {
      this.alarmOff();
      timer.setTimeout(() => {
         this.routeToHome() }, 500);
    }
  }

  private _allCountersAtZero() {
    (this.longPressCounter + this.swipeLeftCounter + this.pinchCounter + this.rotateCounter) === 0
  }

  routeToHome(){
    this._router.navigate([""]);
  }

  private _success() {
    return "Success!!"
  }

  public get longPressMessage() : string {
    if (this.longPressCounter > 0) {
      return "Press and hold here x" + this.longPressCounter;
    } else {
      return "Success!!";
    }
  }

  public get swipeMessage() : string {
    if (this.swipeLeftCounter > 0) {
      return "Swipe LEFT here x" + this.swipeLeftCounter;
    } else {
      return "Success!!";
    }
  }

  public get pinchMessage() : string {
    if (this.pinchCounter > 0) {
      return "Pinch here x" + this.pinchCounter;
    } else {
      return "Success!!";
    }
  }

  public get rotateMessage() : string {
    if (this.rotateCounter > 0) {
      return "Rotate here x" + this.rotateCounter;
    } else {
      return "Success!!";
    }
  }

  ngOnInit() {
    this._soundModule.playAlarm();
  }

  onLongPress() {
    if(this.longPressCounter > 0) {
      this.longPressCounter -= 1;
    }
    this._taskStop();
  }

  onSwipe(args: SwipeGestureEventData) {
    if (args.direction === 2 && this.swipeLeftCounter > 0) {
      this.swipeLeftCounter -= 1;
    }
    this._taskStop()
  }

  onPinch(args: PinchGestureEventData) {
    if(this.pinchCounter > 0) {
      this.pinchCounter -= 1;
    }
    this._taskStop()
  }

  onRotate(args: RotationGestureEventData) {
    if (args.rotation > 89 && this.rotateCounter > 0) {
      this.rotateCounter -= 1;
    }
    this._taskStop()
  }

  alarmOff() {
    this._soundModule.stopAlarm();
  }
}
