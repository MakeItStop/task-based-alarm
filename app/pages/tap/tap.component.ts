import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { SoundService } from "../../shared/soundService";

@Component({
    selector: "tap",
    templateUrl: "pages/tap/tap.component.html",
    providers: [SoundService]
})
export class TapPage implements OnInit {
  public counter: number = 16;
  private taskPassed = false;

  constructor(private _router: Router, private _soundModule: SoundService) {}

  public get message(): string{
    if (this.counter > 0) {
      return this.counter + " taps left";
    } else {
      this.taskPassed = true;
      return "You are awake"
    }
  }

  ngOnInit() {
    this._soundModule.playAlarm();
  }

  onTap() {
    if (!this.taskPassed) {
      this.counter--;
    } else {
      this._soundModule.stopAlarm();
      this.routeToHome();
    }
  }

  routeToHome() {
    this._router.navigate([""]);
  }
}
