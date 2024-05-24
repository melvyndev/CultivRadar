const mix = require('laravel-mix');

mix.js('frontend/src/index.js', 'public/js')
   .react()
   .sass('resources/sass/app.scss', 'public/css')
   .version();
