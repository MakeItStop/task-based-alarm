import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {SetAlarmPage} from "./pages/setAlarm/setAlarm.component";
import {TapPage} from "./pages/tap/tap.component";
import {MathGame} from "./pages/math_game/math_game.component";
import {ListPage} from "./pages/list/list.component";
import {SliderPage} from "./pages/slider/slider.component";
import {GesturePage} from "./pages/gesture/gesture.component";
import {MemoryPage} from "./pages/memory/memory.component";
import {SettingsPage} from "./pages/settings/settings.component";


export const routes: RouterConfig = [
  { path: "", component: SetAlarmPage },
  { path: "list", component: ListPage },
  { path: "tap", component: TapPage },
  { path: "slider", component: SliderPage },
  { path: "gesture", component: GesturePage },
  { path: "memory", component: MemoryPage },
  { path: "math-game", component: MathGame },
  { path: "settings", component: SettingsPage }]

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];
