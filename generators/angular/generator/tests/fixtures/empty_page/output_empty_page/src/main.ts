import { LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { OPENUI_I18N } from './app/openui-i18n.service';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: OPENUI_I18N.angularLocale },
  ],
}).catch((error) => console.error(error));
