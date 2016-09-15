import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Tile } from "../../shared/tile/tile"
import { SoundService } from "../../shared/soundService";
import * as applicationSettings from "application-settings";

let timer = require('timer');
let COLORS = ["yellow","red","purple",
              "pink","blue","orange",
              "silver","green","brown",
              "snotGreen","black","beige"]

@Component({
  selector: "memory",
  templateUrl: "pages/memory/memory.component.html",
  styleUrls: ["pages/memory/memory-common.css"],
  providers: [SoundService]
})

export class MemoryPage implements OnInit {
  public taskPassed = false;
  public selectedTiles = [];
  public tiles: Array<Tile> = [];
  private _maxTiles = this._getDifficulty();
  private _maxColumns = Math.ceil(this._maxTiles/6);
  private _maxRows = this._maxTiles/this._maxColumns
  public displayColumns = this._multiply(['*'], this._maxColumns).join();
  public displayRows = this._multiply(['*'], this._maxRows).join();

  private _getDifficulty() {
    let difficulty = applicationSettings.getNumber("memoryDifficulty", 8);
    console.log(difficulty);

    this._multiply(COLORS, Math.ceil(difficulty/COLORS.length));

    return difficulty*2;

  }

  private _multiply(array, multiple) {
    let limit = array.length*(multiple-1);
    for (var i = 0; i<limit; i++) {
      array.push(array[i]);
    }
    return array;
  }

  constructor(private _router: Router, private _soundModule: SoundService) {
    let colors = COLORS.slice(0, this._maxTiles/2)
    this._multiply(colors, 2)
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
    tile.id = colors[index];
    this.tiles.push(tile);
  }

  ngOnInit() {
    this._soundModule.playAlarm();
  }

  onTap() {
    if (this.taskPassed) {
      this._alarmOff();
      this._routeToIndex();
    } else {
      alert("Complete the task first!")
    }
  }

  private _alarmOff() {
    this._soundModule.stopAlarm();
  }

  private _routeToIndex() {
    this._router.navigate([""]);
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
