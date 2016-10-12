import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Slider } from "ui/slider";
import { Router } from "@angular/router";
import { PropertyChangeData } from "data/observable";
import { SoundService } from "../../shared/soundService";
import * as applicationSettings from "application-settings";
let timer = require('timer');

@Component({
  selector: "slide",
  templateUrl: "pages/slider/slider.component.html",
  styleUrls: ["pages/slider/slider.component.css"],
  providers: [SoundService]
})

export class SliderPage implements OnInit {
  private sliderCounter: number = 0;
  private _difficulty = applicationSettings.getNumber("memoryDifficulty", 10);
  public SLIDERLIMIT = this._difficulty * 2;
  public EXPECTEDVALUE = Math.ceil(Math.random()*this.SLIDERLIMIT);
  public expectedMessage = `Slide to ${this.EXPECTEDVALUE}`

  constructor(private _router: Router, private _soundModule: SoundService) {}

  ngOnInit() {
    this._soundModule.playAlarm();
  }

  private _taskStop() {
    if (this.sliderCounter === 5) {
      this.alarmOff();
      timer.setTimeout(() => {
        this.routeToHome();
      }, 500);
    }
  }

  valueChanged(slider) {
    console.log("VALUE" + slider.value);
    if (slider.value === this.EXPECTEDVALUE) {
      slider.isUserInteractionEnabled = false;
      this.sliderCounter++;
      this._taskStop();
    }
  }

  alarmOff() {
    this._soundModule.stopAlarm();
  }

  routeToHome(){
    this._router.navigate([""]);
  };

}
