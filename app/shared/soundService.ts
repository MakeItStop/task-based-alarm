import {Injectable} from "@angular/core";
let sound = require("nativescript-sound");
import * as applicationSettings from "application-settings";
let timer = require('timer');

@Injectable()

export class SoundService {

  private sounds: any = {
    "foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "bomb_siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "railroad": sound.create("~/sounds/Railroad.mp3"),
    "warning": sound.create("~/sounds/Warning.mp3"),
  };
  public alarmLooper = {};
  public currentSound = this._getSound();
  public ALARMLOOPTIME = 4100;

  private _getSound() {
    let sound = applicationSettings.getString("sound", "alarm");
    if (sound === "random") {
      return this._getRandomItemFrom(Object.keys(this.sounds));
    }
    return sound;
  }

  private _getRandomItemFrom(array) {
    let randomIndex = Math.floor(Math.random() * (array.length));
    return array[randomIndex];
  }


  public playAlarm() {
    this.sounds[this.currentSound].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds[this.currentSound].play();
    }, this.ALARMLOOPTIME);
  }

  public stopAlarm() {
    this.sounds[this.currentSound].stop();
    timer.clearInterval(this.alarmLooper);
  }
}
