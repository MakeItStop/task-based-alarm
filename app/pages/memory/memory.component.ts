import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Tile } from "../../shared/tile/tile"
// import { GridLayout } from "ui/layouts/grid-layout";
// import { Observable, Subscription, Subject } from 'rxjs/Rx';
// // import { AutoGridRows, AutoGridColumns } from "./../../utils/grid.directive";
let sound = require("nativescript-sound");
let timer = require('timer');
let COLORS = ["yellow", "yellow","red","red","purple","purple",
              "pink","pink","blue","blue","orange","orange",
              "silver","silver","green","green","brown","brown",
              "snotGreen","snotGreen","black","black","beige","beige"]

@Component({
  selector: "memory",
  templateUrl: "pages/memory/memory.component.html",
  styleUrls: ["pages/memory/memory-common.css"]
})

export class MemoryPage implements OnInit {
  public taskPassed = false;
  private alarmLooper = {};
  public selectedTiles = [];
  public tiles: Array<Tile> = [];
  private _maxTiles = 24;
  private _maxColumns = Math.floor(this._maxTiles/4);
  private _maxRows = this._maxTiles/this._maxColumns
  public displayColumns = this._multiply(['*'], this._maxColumns);
  public displayRows = this._multiply(['*'], this._maxRows);

  private _multiply(array, multiple) {
    let limit = array.length*(multiple-1);
    for (var i = 0; i<limit; i++) {
      array.push(array[i]);
    }
    return array;
  }

  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {
    let colors = COLORS.slice(0, this._maxTiles)
    this._shuffle(colors);
    for (var tileIndex = 0; tileIndex < this._maxTiles; tileIndex++) {
      this._createTile(tileIndex, colors);
    }
    for (var tile = 0; tile < this.tiles.length; tile++){
    }
  }

  private _createTile(index, colors) {
    let tile = new Tile();
    tile.col = index%this._maxColumns;
    tile.row = Math.floor(index/this._maxColumns);
    // tile.id = COLORS[Math.floor(index/2)];
    tile.id = colors[index];
    this.tiles.push(tile);
  }
  public playAlarm() {
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
      this._routeToIndex();
    } else {
      alert("Complete the task first!")
    }
  }

  private _routeToIndex() {
    this._router.navigate([""]);
  }

  public get headerMessage() : string {
    if (!this.taskPassed) {
      return "Test Your Memory";
    } else {
      return "Success!!";
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
    return this._getTilesLength() === this._maxTiles;
  }

  private _getTilesLength() {
    return this.selectedTiles.length;
  }

  private _getTileElement(index) {
    return this.selectedTiles[this._getTilesLength() + index];
  }

  private _shuffle(array) {
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = array.length -1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

}
