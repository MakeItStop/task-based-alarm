// import observable = require("data/observable");
import {Component} from "@angular/core";
import { Slider } from "ui/slider";
import { Router } from "@angular/router";
// import { Page } from "ui/page";

@Component({
  selector: "slider",
  templateUrl: "pages/slider/slider.component.html",
})

export class SliderPage {

  // private taskPassed = false;
  // constructor(private _router: Router) {}

  checkValue(slider:Slider){
    console.log(slider.value);
  }

  // if slider.value == slider.maxValue {
  //   this.taskPassed = true;
  // }

  // onTap() {
  //   if this.taskPassed {
  //     this._stopAlarm();
  //     this._router.navigate([""]);
  //   }
  // }

}
