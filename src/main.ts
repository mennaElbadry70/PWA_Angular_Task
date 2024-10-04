import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));

  
  // bootstrap : first module to run 
  // this function runs on browser and things that change dynamically
  // ngZoneEventCoalescing : like event bubbling / propogation
  // app module 
