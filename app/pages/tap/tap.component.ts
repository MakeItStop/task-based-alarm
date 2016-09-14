import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import * as applicationSettings from "application-settings";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
    selector: "tap",
    templateUrl: "pages/tap/tap.component.html"
})
export class TapPage implements OnInit {
  public counter: number = 16;
  private taskPassed = false;
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

  public get message(): string{
    if (this.counter > 0) {
      return this.counter + " taps left";
    } else {
      this.taskPassed = true;
      return "You are awake"
    }
  }

  public playAlarm() {
    // let alarmArray = Object.keys(this.sounds)
    // let randomAlarm = alarmArray[Math.floor(Math.random() * alarmArray.length)]
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

  onTap() {
    if (!this.taskPassed) {
      this.counter--;
    } else {
      this._stopAlarm();
      this.routeToHome();
    }
  }

  routeToHome() {
    this._router.navigate([""]);
  }

}
