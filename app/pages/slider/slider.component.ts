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
  public sliderLimit = this._difficulty * 2;
  private _expectedSum = Math.ceil(Math.random()*this.sliderLimit * 2)+ this.sliderLimit*2;
  private _CURRENTTOTAL = 0;
  public expectedMessage = `Slide to a total of ${this._expectedSum}`;
  public totalMessage = `Current total: ${this._CURRENTTOTAL}`;
  public maxMessage = `Slider max: ${this.sliderLimit}`;
  public taskPassed = false;

  constructor(private _router: Router, private _soundModule: SoundService) {}

  ngOnInit() {
    this._soundModule.playAlarm();
  }

  private _taskStop(total) {
    if (Math.ceil(total) === this._expectedSum) {
      this.taskPassed = true;
    } else {
      this.updateMessage(total);
    }
  }

  updateMessage(total) {
    this._CURRENTTOTAL = Math.ceil(total);
    this.totalMessage = `Current total: ${this._CURRENTTOTAL}`;
  }

  endTask() {
    this.alarmOff();
    timer.setTimeout(() => {
      this.routeToHome();
    }, 500);
  }

  alarmOff() {
    this._soundModule.stopAlarm();
  }

  routeToHome(){
    this._router.navigate([""]);
  };

  sliderTotal(one,two,three,four,five){
    var total = one.value + two.value + three.value + four.value;
    this._taskStop(total);
  }

  onTap() {
    if(this.taskPassed) {
      this.endTask()
    } else {
      alert("Complete the task first!")
    }
  }


}
