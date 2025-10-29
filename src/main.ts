import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.js';
import { appConfig } from './app/helper/app.config.js';

bootstrapApplication(App, appConfig)
.catch(err => console.error(err));
