import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {AlarmPage} from "./pages/alarm/alarm.component";
import {ListPage} from "./pages/list/list.component";

export const routes: RouterConfig = [
  { path: "", component: AlarmPage },
  { path: "list", component: ListPage }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];
