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
  public math = null
  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {}

  public get message(): string{
    if (this.math == 92) {
      this.taskPassed = true;
      return "Correct!!"
    } else {
      return ;
    }
  }

  public playAlarm() {
    // let alarmArray = Object.keys(this.sounds)
    // let randomAlarm = alarmArray[Math.floor(Math.random() * alarmArray.length)]
    this.sounds["Bomb_Siren"].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds["Bomb_Siren"].play();
    }, 10000);
  }

  private _stopAlarm() {
    this.sounds["Bomb_Siren"].stop();
    timer.clearInterval(this.alarmLooper);
  }

  ngOnInit() {
    this.playAlarm();
  }

  onTap() {
    if (this.math == 92) {
      this._stopAlarm();
      this._router.navigate([""]);
    } else {
      return;
    }
  }

}
