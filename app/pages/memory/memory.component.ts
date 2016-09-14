import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { SoundService } from "../../shared/soundService";
let timer = require('timer');


@Component({
  selector: "memory",
  templateUrl: "pages/memory/memory.component.html",
  styleUrls: ["pages/memory/memory-common.css"],
  providers: [SoundService]
})

export class MemoryPage implements OnInit {
  public taskPassed = false;
  public selectedTiles = [];


  constructor(private _router: Router, private _soundModule: SoundService) {}

  ngOnInit() {
    this._soundModule.playAlarm();
  }

  onTap() {
    if (this.taskPassed) {
      this._soundModule.stopAlarm();
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
