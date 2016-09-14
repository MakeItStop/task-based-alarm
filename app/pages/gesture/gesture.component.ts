import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { SwipeGestureEventData, PinchGestureEventData, RotationGestureEventData } from "ui/gestures";
import { SoundService } from "../../shared/soundService";
let timer = require('timer');

@Component({
    selector: "gesture",
    templateUrl: "pages/gesture/gesture.component.html",
    providers: [SoundService]
    // styleUrls : ['gesture.component.css']
})
export class GesturePage implements OnInit {
  private longPress = false;
  private swipeLeft = false;
  private pinch = false;
  private rotate = false;

  constructor(private _router: Router, private _soundModule: SoundService) {}

  private _taskStop() {
    if (this.longPress && this.swipeLeft && this.pinch && this.rotate === true) {
      this.alarmOff();
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

  ngOnInit() {
    this._soundModule.playAlarm();
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

  alarmOff() {
    this._soundModule.stopAlarm();
  }
}
