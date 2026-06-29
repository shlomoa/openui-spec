import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppFileUploadComponent } from './components/app-file-upload/app-file-upload.component';

@Component({
  selector: 'app-root',
  imports: [AppFileUploadComponent],
  template: `
    <app-file-upload></app-file-upload>
  `,
})
export class App {}

bootstrapApplication(App, {
  providers: [provideAnimations()]
});
