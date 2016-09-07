import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { TimePicker } from "ui/time-picker";
import { EventData } from 'data/observable'
import {TextField} from "ui/text-field";
import { Page } from 'ui/page'



@Component({
    selector: "alarm",
    templateUrl: "pages/alarm/alarm.component.html",
})
export class AlarmPage {
  // time = 0;
  @ViewChild("timePicker") timePicker: ElementRef;

  configureTime(timePicker: TimePicker) {
    timePicker.hour = 9;
    timePicker.minute = 25;
  }
  print(timePicker: TimePicker) {
    alert("You have selected " + timePicker.hour + ':' + timePicker.minute)
  }

}
