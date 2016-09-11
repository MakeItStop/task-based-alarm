// import observable = require("data/observable");
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Slider } from "ui/slider";
import { Router } from "@angular/router";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
  selector: "slide",
  templateUrl: "pages/slide/slide.component.html",
  styleUrls: ["pages/slide/slide.component.css"]
})

export class SlidePage implements OnInit {
  private alarmLooper = {};
  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {}


  public playAlarm() {
    // let alarmArray = Object.keys(this.sounds)
    // let randomAlarm = alarmArray[Math.floor(Math.random() * alarmArray.length)]
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

  checkValue(slider1,slider2,slider3,slider4,slider5){
    let args = Array.prototype.slice.call(arguments);
    let values = args.map(function(i){return i.value});
    // console.log("valuesArr>>>>>>" + values);
    if (values.every(elem => elem === 10)) {
      this._stopAlarm();
      this._router.navigate([""]);
    };
  };

}
