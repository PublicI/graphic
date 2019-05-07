import Vue from 'vue';
import Vuetify from 'vuetify';

// https://github.com/Upstatement/cpi-wordpress/blob/master/static/scss/abstracts/_variables.scss

Vue.use(Vuetify,{
  theme: {
    primary: '#04284b', // blue-dark
    secondary: '#4FA2ff', // blue-bright-2
    accent: '#0276e8', // blue-bright
    success: '#1ebcbc', // mint
    error: '#f35d26' // coral
  }
});
