import {Injectable} from "@angular/core";
let sound = require("nativescript-sound");
import * as applicationSettings from "application-settings";
let timer = require('timer');

@Injectable()

export class SoundService {
  public alarmLooper = {};
  public currentSound = applicationSettings.getString("sound", "alarm");
  public ALARMLOOPTIME = 4100

  private sounds: any = {
    "foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "bomb_siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "railroad": sound.create("~/sounds/Railroad.mp3"),
    "warning": sound.create("~/sounds/Warning.mp3"),
  };

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
