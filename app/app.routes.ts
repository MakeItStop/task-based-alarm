import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {SetAlarmPage} from "./pages/setAlarm/setAlarm.component";
import {ListPage} from "./pages/list/list.component";

export const routes: RouterConfig = [
  { path: "", component: SetAlarmPage },
  { path: "list", component: ListPage }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];
