import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { ListPicker } from "ui/list-picker";
import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Slider } from "ui/slider";


let taskList = ["tap","maths","slider", "gesture", "memory", "random"];
let soundList = ["foghorn","alarm", "bomb_siren", "railroad", "warning", "random"];

@Component({
  selector: "settings",
  templateUrl: "pages/settings/settings.component.html",
})

export class SettingsPage {
  private _currentTask = "";
  private _currentSound = "";
  private _randomIndex = Math.floor(Math.random()* 5);

  public tasks: Array<string>;
  public sounds: Array<string>;

  public savedTask = applicationSettings.getString("task");
  public savedSound = applicationSettings.getString("sound");
  public savedDifficulty = applicationSettings.getNumber("memoryDifficulty");

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
    picker.selectedIndex = picker.items.indexOf(this.savedTask);
  }

  public configureSound(soundPicker: ListPicker) {
    soundPicker.selectedIndex = soundPicker.items.indexOf(this.savedSound);
  }

  public selectedIndexChanged(taskPicker) {
    if (taskPicker.selectedIndex === 5) {
      taskPicker.selectedIndex = this._randomIndex;
    }
    this._currentTask = taskList[taskPicker.selectedIndex] || "tap";
    this._storeString("task", this._currentTask);
  }

  public selectedSoundIndexChanged(soundPicker) {
    if (soundPicker.selectedIndex === 5) {
      soundPicker.selectedIndex = this._randomIndex;
    }
    this._currentSound = soundList[soundPicker.selectedIndex] || "alarm";
    this._storeString("sound", this._currentSound);

  }

  public difficultyChanged(slider) {
    this._storeNumber("memoryDifficulty", Math.ceil(slider.value));
  }

  private _storeString(attribute, value) {
    applicationSettings.setString(attribute, value);
  }
  private _storeNumber(attribute, value) {
    applicationSettings.setNumber(attribute, value);
  }

  public saveSettings() {
    this._router.navigate([""]);
  }
}
