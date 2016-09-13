import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Slider } from "ui/slider";
import { Router } from "@angular/router";
import { PropertyChangeData } from "data/observable";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
  selector: "slide",
  templateUrl: "pages/slider/slider.component.html",
  styleUrls: ["pages/slider/slider.component.css"]
})

export class SliderPage implements OnInit {
  private sliderCounter: number = 0;
  private alarmLooper = {};
  private sounds: any = {
    "Foghorn": [sound.create("~/sounds/Foghorn.mp3"), 5100],
    "Alarm": [sound.create("~/sounds/Alarm_Clock.mp3"),21100],
    "Bomb_Siren": [sound.create("~/sounds/Bomb_Siren.mp3"),21100],
    "Railroad": [sound.create("~/sounds/Railroad.mp3"),45100],
    "Warning": [sound.create("~/sounds/Warning.mp3"),39100]
  };

  constructor(private _router: Router) {}

  ngOnInit() {
    this.playAlarm();
  }

  public playAlarm() {
    // let alarmArray = Object.keys(this.sounds)
    // let randomAlarm = alarmArray[Math.floor(Math.random() * alarmArray.length)]
    this.sounds["Railroad"][0].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds["Railroad"][0].play();
    }, this.sounds["Railroad"][1]);
  }

  private _stopAlarm() {
    this.sounds["Railroad"][0].stop();
    timer.clearInterval(this.alarmLooper);
  }

  private _taskStop() {
    if (this.sliderCounter === 5) {
      this._stopAlarm();
      timer.setTimeout(() => {
         this._router.navigate([""]) }, 500);
    }
  }

  valueChanged(slider) {
    if (slider.value === slider.maxValue) {
      slider.isUserInteractionEnabled = false;
      this.sliderCounter++;
      this._taskStop();
    }
  }

}
