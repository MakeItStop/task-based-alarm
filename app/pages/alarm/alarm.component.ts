import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
// import { TimePicker } from "ui/time-picker";
// import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
let sound = require("nativescript-sound")
// import { Alarm } from "../../shared/alarm/alarm";
// import { EventData } from 'data/observable'
// import {TextField} from "ui/text-field";
// import { Page } from 'ui/page'

@Component({
    selector: "alarm",
    templateUrl: "pages/alarm/alarm.component.html",
})
export class AlarmPage implements OnInit {

  constructor(private _router: Router) {}


  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
  };

  ngOnInit() {
    this.sounds["Foghorn"].play();
  }

}
