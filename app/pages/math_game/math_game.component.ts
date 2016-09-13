import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
    selector: "math_game",
    templateUrl: "pages/math_game/math_game.component.html",
})
export class MathGame implements OnInit {

  private taskPassed = false;
  private alarmLooper = {};
  private _answer = null
  private num1 = Math.floor(Math.random() * 95) + 1
  private num2 = Math.floor(Math.random() * 73) + 1
  private num3 = Math.floor(Math.random() * 47) + 1
  private num4 = Math.floor(Math.random() * 36) + 1
  private sounds: any = {
    "Foghorn": [sound.create("~/sounds/Foghorn.mp3"), 5100],
    "Alarm": [sound.create("~/sounds/Alarm_Clock.mp3"),21100],
    "Bomb_Siren": [sound.create("~/sounds/Bomb_Siren.mp3"),21100],
    "Railroad": [sound.create("~/sounds/Railroad.mp3"),45100],
    "Warning": [sound.create("~/sounds/Warning.mp3"),39100]
  };

  constructor(private _router: Router) {}

  public get question(): string{
    return "What is " + this.num1 + "+" + this.num2 + "-" + this.num3 + "-" + this.num4 + "?"
  }

  public get message(): string{
    if (this._answer == (this.num1 + this.num2 - this.num3 - this.num4)) {
      this.taskPassed = true;
      return "Correct!!"
    } else {
      return "Try again";
    }
  }

  public playAlarm() {
    this.sounds["Foghorn"][0].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds["Foghorn"][0].play();
    }, this.sounds["Foghorn"][1]);
  }

  private _stopAlarm() {
    this.sounds["Foghorn"][0].stop();
    timer.clearInterval(this.alarmLooper);
  }

  ngOnInit() {
    this.playAlarm();
  }

  onTap() {
    if (this._answer == (this.num1 + this.num2 - this.num3 - this.num4)) {
      this._stopAlarm();
      this._router.navigate([""]);
    } else {
      return;
    }
  }

}
