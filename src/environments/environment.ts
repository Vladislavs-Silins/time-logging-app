// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAfcp3iWYUM6zWEqS4ZiF9LxXkKHI5zsIY',
    authDomain: 'time-logging-database.firebaseapp.com',
    databaseURL: 'https://time-logging-database.firebaseio.com',
    projectId: 'time-logging-database',
    storageBucket: 'time-logging-database.appspot.com',
    messagingSenderId: '476106319411'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
