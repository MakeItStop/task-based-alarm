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
  private _difficulty = applicationSettings.getNumber("memoryDifficulty", 10);
  public SLIDERLIMIT = this._difficulty * 2;
  public EXPECTEDSUM = Math.ceil(Math.random()*this.SLIDERLIMIT * 5);
  public CURRENTTOTAL = 0;
  public expectedMessage = `Slide to a total of ${this.EXPECTEDSUM}`;
  public totalMessage = `Current total: ${this.CURRENTTOTAL}`;
  public maxMessage = `Slider max: ${this.SLIDERLIMIT}`;

  constructor(private _router: Router, private _soundModule: SoundService) {}

  ngOnInit() {
    this._soundModule.playAlarm();
  }

  private _taskStop(total) {
    if (Math.ceil(total) === this.EXPECTEDSUM) {
      this.alarmOff();
      timer.setTimeout(() => {
        this.routeToHome();
      }, 500);
    } else {
      this.CURRENTTOTAL = Math.ceil(total);
      console.log("TOTAL>>>>>>>" + total);
      this.totalMessage = `Current total: ${this.CURRENTTOTAL}`;
    }
  }

  alarmOff() {
    this._soundModule.stopAlarm();
  }

  routeToHome(){
    this._router.navigate([""]);
  };

  sliderTotal(one,two,three,four,five){
    // var args = [...arguments];
    var total = one + two + three + four + five;
    // var total = args.reduce((pre, cur) => pre + cur);
    this._taskStop(total);
  }


}
