import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Slider } from "ui/slider";
import { Router } from "@angular/router";
import { PropertyChangeData } from "data/observable";
import { SoundService } from "../../shared/soundService";
let timer = require('timer');

@Component({
  selector: "slide",
  templateUrl: "pages/slider/slider.component.html",
  styleUrls: ["pages/slider/slider.component.css"],
  providers: [SoundService]
})

export class SliderPage implements OnInit {
  private sliderCounter: number = 0;

  constructor(private _router: Router, private _soundModule: SoundService) {}

  ngOnInit() {
    this._soundModule.playAlarm();
  }

  private _taskStop() {
    if (this.sliderCounter === 5) {
      this._soundModule.stopAlarm();

      timer.setTimeout(() => {
        this.routeToHome();
      }, 500);
    }
  }

  valueChanged(slider) {
    if (slider.value === slider.maxValue) {
      slider.isUserInteractionEnabled = false;
      this.sliderCounter++;
      this._taskStop();
    }
  }

  routeToHome(){
    this._router.navigate([""]);
  };

}
