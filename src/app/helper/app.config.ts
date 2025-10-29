import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.router";
import { loadingInterceptor } from "../../interceptors/loading-interceptor";

export const appConfig: ApplicationConfig = { 
    providers: [
      provideHttpClient(withInterceptors([loadingInterceptor])),
      provideRouter(routes, withComponentInputBinding())
    ]
  }