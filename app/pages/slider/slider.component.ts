// import observable = require("data/observable");
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
  private alarmLooper = {};
  private sounds: any = {
    "Foghorn": [sound.create("~/sounds/Foghorn.mp3"), 5100],
    "Alarm": [sound.create("~/sounds/Alarm_Clock.mp3"),21100],
    "Bomb_Siren": [sound.create("~/sounds/Bomb_Siren.mp3"),21100],
    "Railroad": [sound.create("~/sounds/Railroad.mp3"),45100],
    "Warning": [sound.create("~/sounds/Warning.mp3"),39100]
  };

  constructor(private _router: Router) {}


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

  ngOnInit() {
    this.playAlarm();
  }

  checkValue(slider1,slider2,slider3,slider4,slider5){
    let args = Array.prototype.slice.call(arguments);
    let values = args.map(function(i){return i.value});
    if (values.every(elem => elem === 10)) {
      this._stopAlarm();
      this._router.navigate([""]);
    };
  };

  valueChanged() {
    console.log("Property Changed!");
  }

}
