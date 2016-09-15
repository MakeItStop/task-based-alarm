import {Injectable} from "@angular/core";
let sound = require("nativescript-sound");
import * as applicationSettings from "application-settings";
let timer = require('timer');

@Injectable()

export class SoundService {
  public alarmLooper = {};
  public currentSound = applicationSettings.getString("sound", "alarm");

  private sounds: any = {
    "foghorn": [sound.create("~/sounds/Foghorn.mp3"), 5100],
    "alarm": [sound.create("~/sounds/Alarm_Clock.mp3"),21100],
    "bomb_siren": [sound.create("~/sounds/Bomb_Siren.mp3"),21100],
    "railroad": [sound.create("~/sounds/Railroad.mp3"),45100],
    "warning": [sound.create("~/sounds/Warning.mp3"),39100]
  };

  public playAlarm() {
    this.sounds[this.currentSound][0].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds[this.currentSound][0].play();
    }, this.sounds[this.currentSound][1]);
  }

  public stopAlarm() {
    this.sounds[this.currentSound][0].stop();
    timer.clearInterval(this.alarmLooper);
  }
}
