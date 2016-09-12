import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {SetAlarmPage} from "./pages/setAlarm/setAlarm.component";
import {AlarmPage} from "./pages/alarm/alarm.component";
import {MathGame} from "./pages/math_game/math_game.component";
import {ListPage} from "./pages/list/list.component";
import {SlidePage} from "./pages/slide/slide.component";
import {GesturePage} from "./pages/gesture_task/gesture.component";


export const routes: RouterConfig = [
  { path: "", component: SetAlarmPage },
  { path: "list", component: ListPage },
  { path: "alarm", component: AlarmPage },
  { path: "slide", component: SlidePage },
  { path: "gesture", component: GesturePage },
  { path: "math-game", component: MathGame }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];
