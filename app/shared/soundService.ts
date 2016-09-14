import {Injectable} from "@angular/core";
let sound = require("nativescript-sound");
import * as applicationSettings from "application-settings";
let timer = require('timer');

@Injectable()

export class SoundService {
  public alarmLooper = {};
  public currentSound = applicationSettings.getString("sound");

  private sounds: any = {
    "Foghorn": [sound.create("~/sounds/Foghorn.mp3"), 5100],
    "Alarm": [sound.create("~/sounds/Alarm_Clock.mp3"),21100],
    "Bomb_Siren": [sound.create("~/sounds/Bomb_Siren.mp3"),21100],
    "Railroad": [sound.create("~/sounds/Railroad.mp3"),45100],
    "Warning": [sound.create("~/sounds/Warning.mp3"),39100]
  };

  public playAlarm() {
    //   // let alarmArray = Object.keys(this.sounds)
    //   // let randomAlarm = alarmArray[Math.floor(Math.random() * alarmArray.length)]
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
