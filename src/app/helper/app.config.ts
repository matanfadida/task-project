import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.router";

export const appConfig: ApplicationConfig = { 
    providers: [
      provideHttpClient(),
      provideRouter(routes, withComponentInputBinding())
    ]
  }