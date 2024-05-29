const mix = require('laravel-mix');

mix.setPublicPath('public')
   .setResourceRoot('/storage/basset/')
   .js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .version();
