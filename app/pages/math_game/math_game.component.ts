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

  private _taskPassed = false;
  private alarmLooper = {};
  public answer = null;
  private _numberArray = []
  private _ARRAYMAX = 4;
  private _NEGATIVEOFFSET = 50;
  private _RANDOMLIMIT = 100;
  private _numberStringArray = [];

  private sounds: any = {
    "Foghorn": [sound.create("~/sounds/Foghorn.mp3"), 5100],
    "Alarm": [sound.create("~/sounds/Alarm_Clock.mp3"),21100],
    "Bomb_Siren": [sound.create("~/sounds/Bomb_Siren.mp3"),21100],
    "Railroad": [sound.create("~/sounds/Railroad.mp3"),45100],
    "Warning": [sound.create("~/sounds/Warning.mp3"),39100]
  };

  constructor(private _router: Router) {
    for (var i = 0; i < this._ARRAYMAX; i++) {
      let randomNumber = Math.floor(Math.random()*this._RANDOMLIMIT) - this._NEGATIVEOFFSET;
      this._numberArray.push(randomNumber);
      this._numberStringArray.push(this._formatNumber(randomNumber));
    }
    this._numberArray[0] = Math.abs(this._numberArray[0]);
  }

  public get question(): string{
    return "What is " + this._numberStringArray.join('').slice(1);
  }

  private _formatNumber(number) {
    let numberSign = this._isNumberPositive(number) ? '+' : '-';
    return numberSign + Math.abs(number);
  }

  private _isNumberPositive(number) {
    return number && (number / Math.abs(number) === 1)
  }

  private _sumNumbers() {
    return this._numberArray.reduce((prev, curr) => prev + curr);
  }

  public get message(): string{

    if (this.answer == this._sumNumbers()) {
      this._taskPassed = true;
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
    // this.playAlarm();
  }

  onTap() {
    console.log("solution>>" + this._sumNumbers())
    if (this._taskPassed) {
      this._stopAlarm();
      this._router.navigate([""]);
    }
  }

}
