import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

export default () =>
  bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes), provideHttpClient(withFetch())],
  });
