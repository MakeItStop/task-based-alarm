import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { SoundService } from "../../shared/soundService";
import * as applicationSettings from "application-settings";
let timer = require('timer');

@Component({
    selector: "maths",
    templateUrl: "pages/maths/maths.component.html",
    styleUrls: ["pages/maths/maths.component.css"],
    providers: [SoundService]
})
export class MathsPage implements OnInit {

  public taskPassed = false;
  public answer = null;
  private _numberArray = []
  private _ARRAYMAX = 4;
  private _difficulty = applicationSettings.getNumber("memoryDifficulty", 10);
  private _RANDOMLIMIT = this._difficulty * 20;
  private _NEGATIVEOFFSET = this._RANDOMLIMIT / 2;
  private _numberStringArray = [];

  constructor(private _router: Router, private _soundModule: SoundService) {
    for (var i = 0; i < this._ARRAYMAX; i++) {
      let randomNumber = Math.floor(Math.random()*this._RANDOMLIMIT) - this._NEGATIVEOFFSET;
      this._numberArray.push(randomNumber);
      this._numberStringArray.push(this._formatNumber(randomNumber));
    }
    this._numberArray[0] = Math.abs(this._numberArray[0]);
  }

  public get question(): string{
    return "What is " + this._numberStringArray.join('').slice(1) + "?";
    }

  private _formatNumber(number) {
    let numberSign = this._isNumberPositive(number) ? '+' : '-';
    return numberSign + Math.abs(number);
  }

  private _isNumberPositive(number) {
    return number && (number / Math.abs(number) === 1)
  }

  private _sumNumbers() {
    return this._numberArray.reduce((prev, curr) => prev + curr);
  }

  public get message(): string{

    if (this.answer == this._sumNumbers()) {
      this.taskPassed = true;
      return "Correct!!"
    } else {
      return "Try again";
    }
  }

  checkSum() {
    if (this.answer == this._sumNumbers()) {
      this.taskPassed = true;
    } else {
      alert("Incorrect - try again!")
    }
  }


  ngOnInit() {
    this._soundModule.playAlarm();
  }

  onTap() {
    console.log("solution>>" + this._sumNumbers())
    if (this.taskPassed) {
      this._soundModule.stopAlarm();
      this._router.navigate([""]);
    } else {
      alert("Complete the task first!")
    }
  }

}
