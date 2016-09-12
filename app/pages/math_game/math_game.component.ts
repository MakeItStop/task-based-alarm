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
  private math = null
  private num1 = Math.floor(Math.random() * 95) + 1
  private num2 = Math.floor(Math.random() * 73) + 1
  private num3 = Math.floor(Math.random() * 47) + 1
  private num4 = Math.floor(Math.random() * 36) + 1
  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {}

  public get question(): string{
    return "What is " + this.num1 + "+" + this.num2 + "-" + this.num3 + "-" + this.num4 + "?"
  }

  public get message(): string{
    if (this.math == (this.num1 + this.num2 - this.num3 - this.num4)) {
      this.taskPassed = true;
      return "Correct!!"
    } else {
      return "try again";
    }
  }

  public playAlarm() {
    // let alarmArray = Object.keys(this.sounds)
    // let randomAlarm = alarmArray[Math.floor(Math.random() * alarmArray.length)]
    this.sounds["Foghorn"].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds["Foghorn"].play();
    }, 5000);
  }

  private _stopAlarm() {
    this.sounds["Foghorn"].stop();
    timer.clearInterval(this.alarmLooper);
  }

  ngOnInit() {
    this.playAlarm();
  }

  onTap() {
    if (this.math == (this.num1 + this.num2 - this.num3 - this.num4)) {
      this._stopAlarm();
      this._router.navigate([""]);
    } else {
      return;
    }
  }

}
