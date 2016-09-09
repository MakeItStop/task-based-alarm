import "reflect-metadata";
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {NS_HTTP_PROVIDERS} from "nativescript-angular/http";
import {AppComponent} from "./app.component";
import {APP_ROUTER_PROVIDERS} from "./app.routes";

nativeScriptBootstrap(AppComponent, [NS_HTTP_PROVIDERS, APP_ROUTER_PROVIDERS]);
