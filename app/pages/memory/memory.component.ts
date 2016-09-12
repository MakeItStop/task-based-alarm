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
  public taskPassed = false;
  private alarmLooper = {};
  public selectedTiles = [];

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
    this.playAlarm();
  }

  onTap() {
    if (this.taskPassed) {
      this._stopAlarm();
      this._router.navigate([""]);
    } else {
      return;
    }
  }

  chooseTile(tile) {
    this.selectedTiles.push(tile);
    if (this.selectedTiles.length % 2 === 0) {
      this.matchTile();
    }
  }

  matchTile() {
    if (this.doesIdMatch()) {
      if (this.allTilesMatched()) {
        this.taskPassed = true;
      }
    }
    else {
      timer.setTimeout(() => {
        this.selectedTiles.splice(-2,2);
      }, 500);
    }
  }

  doesIdMatch(){
    let tilesLength = this.selectedTiles.length;
    return (this.selectedTiles[tilesLength - 1].id === this.selectedTiles[tilesLength - 2].id);
  }

  allTilesMatched(){
    let tilesLength = this.selectedTiles.length;
    return tilesLength === 24;
  }


}
