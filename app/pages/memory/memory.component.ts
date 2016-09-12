import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
let sound = require("nativescript-sound");
let timer = require('timer');


@Component({
  selector: "memory",
  templateUrl: "pages/memory/memory.component.html",
  styleUrls: ["pages/memory/memory-common.css"]

})

export class MemoryPage implements OnInit {
  private _taskPassed = false;
  private alarmLooper = {};
  private _firstTile = null;
  public selectedTile = null;

  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {}
  public playAlarm() {
    // let alarmArray = Object.keys(this.sounds)
    // let randomAlarm = alarmArray[Math.floor(Math.random() * alarmArray.length)]
    this.sounds["Foghorn"].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds["Foghorn"].play();
    }, 5000);
  }

  private _stopAlarm() {
    this.sounds["Foghorn"].stop();
    timer.clearInterval(this.alarmLooper);
  }

  ngOnInit() {
    // this.playAlarm();
  }

  onTap() {
    if (this._taskPassed) {
      this._stopAlarm();
      this._router.navigate([""]);
    } else {
      return;
    }
  }

  chooseTile(tile) {
    if (!this._firstTile) {
      this._firstTile = tile;
      this.selectedTile = tile;
    } else {
      this.matchTile(tile)
    }
  }

  matchTile(tile) {
    if (this._firstTile.id === tile.id) {
      this._taskPassed = true
    // } else {
    //
    }
  }
}
