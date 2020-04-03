import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBGA8Qic326JUGpSKGHC7zA3VInj8C0DMY',
    libraries: 'places'
  }
});
