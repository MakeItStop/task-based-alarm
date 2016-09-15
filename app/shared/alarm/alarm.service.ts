import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Alarm} from "./alarm";
import {Config} from "../config";
import {Observable} from "rxjs/Rx";


@Injectable()
export class AlarmService {
  create(alarm: Alarm) {
    alert("You are setting an alarm for the " + alarm.task + " task.")
  }
}
