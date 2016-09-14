import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { ListPicker } from "ui/list-picker";
import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
import { Page } from "ui/page";

let taskList = ["tap","math-game","slider", "gesture", "memory"]
let soundList = ["Foghorn","Alarm", "Bomb_Siren", "Railroad", "Warning"]

@Component({
  selector: "settings",
  templateUrl: "pages/settings/settings.component.html",
})

export class SettingsPage {
  private _currentTask = "";
  private _currentSound = "";

  public tasks: Array<string>;
  public sounds: Array<string>;

  public savedTask = applicationSettings.getString("task");
  public savedSound = applicationSettings.getString("sound");

  constructor(private _router: Router) {
    this.tasks = [];
    for (let i = 0; i < taskList.length; i++) {
      this.tasks.push(taskList[i]);
    }
    this.sounds = [];
    for (let i = 0; i < soundList.length; i++) {
      this.sounds.push(soundList[i]);
    }
  }

  public configureTask(picker: ListPicker) {
    picker.selectedIndex = picker.items.indexOf(this.savedTask)
  }

  public configureSound(soundPicker: ListPicker) {
    soundPicker.selectedIndex = soundPicker.items.indexOf(this.savedSound)
  }

  public selectedIndexChanged(taskPicker) {
    this._currentTask = taskList[taskPicker.selectedIndex] || "tap";
    this._storeString("task", this._currentTask);
  }

  public selectedSoundIndexChanged(soundPicker) {
    this._currentSound = soundList[soundPicker.selectedIndex] || "Alarm";
    this._storeString("sound", this._currentSound);
  }

  private _storeString(attribute, value) {
    applicationSettings.setString(attribute, value);
    console.log("THIS>>>>>" + applicationSettings.getString("sound"));
  }

  public saveSettings() {
    this._router.navigate([""]);
  }
}
