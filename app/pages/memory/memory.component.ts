import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
// import { AutoGridRows, AutoGridColumns } from "./../../utils/grid.directive";
let sound = require("nativescript-sound");
let timer = require('timer');


@Component({
  selector: "memory",
  templateUrl: "pages/memory/memory.component.html",
  styleUrls: ["pages/memory/memory-common.css"],
  // directives: [NgFor]
})

export class MemoryPage implements OnInit {
  public taskPassed = false;
  private alarmLooper = {};
  public selectedTiles = [];
  public rows;
  public cols;
  public autoCreateColumns = 2;
  public autoCreateRows = 2;

  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {
    this.rows = [0,1];
    this.cols = [0,1];
  }

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
    if (this.taskPassed) {
      this._stopAlarm();
      this._router.navigate([""]);
    } else {
      return;
    }
  }

  chooseTile(tile) {
    this._addToSelectedTiles(tile);
    if (this._twoTilesFlipped()) {
      this._matchTile();
    }
  }

  private _addToSelectedTiles(tile) {
    this.selectedTiles.push(tile);
  }

  private _twoTilesFlipped() {
    return this._getTilesLength() % 2 === 0;
  }

  private _matchTile() {
    this._doesIdMatch() ? this._setTaskAsComplete() : this._resetUnmatchedTiles();
  }

  private _setTaskAsComplete() {
    if (this._allTilesMatched()) {
      this.taskPassed = true;
    }
  }

  private _resetUnmatchedTiles() {
    timer.setTimeout(() => {
      this.selectedTiles.splice(-2,2);
    }, 500);
  }

  private _doesIdMatch(){
    return (this._getTileElement(-1).id === this._getTileElement(-2).id);
  }

  private _allTilesMatched(){
    return this._getTilesLength() === 24;
  }

  private _getTilesLength() {
    return this.selectedTiles.length;
  }

  private _getTileElement(index) {
    return this.selectedTiles[this._getTilesLength() + index];
  }

}
