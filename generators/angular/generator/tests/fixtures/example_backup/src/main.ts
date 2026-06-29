import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  imports: [FileUploadComponent],
  template: `
    <app-file-upload></app-file-upload>
  `,
})
export class App {}

bootstrapApplication(App, {
  providers: [provideAnimations()]
});
