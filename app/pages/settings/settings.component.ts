import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { ListPicker } from "ui/list-picker";
import * as applicationSettings from "application-settings";
import { Router } from "@angular/router";
import { Page } from "ui/page";

let taskList = ["tap","math-game","slider", "gesture", "memory"]

@Component({
  selector: "settings",
  templateUrl: "pages/settings/settings.component.html",
})

export class SettingsPage {
  private _currentTask = "";
  public tasks: Array<string>;
  public savedTask = applicationSettings.getString("task")


  constructor(private _router: Router) {
    this.tasks = [];

    for (let i = 0; i < taskList.length; i++) {
      this.tasks.push(taskList[i]);
    }
  }

  public configureTask(picker: ListPicker) {
    picker.selectedIndex = picker.items.indexOf(this.savedTask)
  }

  public selectedIndexChanged(taskPicker) {
    this._currentTask = taskList[taskPicker.selectedIndex] || "tap";
    this._storeString("task", this._currentTask);
  }

  private _storeString(attribute, value) {
    applicationSettings.setString(attribute, value);
  }

  public saveSettings() {
    this._router.navigate([""]);
  }
}
