import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {SetAlarmPage} from "./pages/setAlarm/setAlarm.component";
import {AlarmPage} from "./pages/alarm/alarm.component";
import {ListPage} from "./pages/list/list.component";
import {SliderPage} from "./pages/slider/slider.component";

export const routes: RouterConfig = [
  { path: "", component: SetAlarmPage },
  { path: "list", component: ListPage },
  { path: "alarm", component: AlarmPage },
  { path: "slider", component: SliderPage },
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];
