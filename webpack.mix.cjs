const mix = require('laravel-mix');

// Définir les chemins publics et des ressources
mix.setPublicPath('public')
   .setResourceRoot('/storage/basset/');

// Compiler les fichiers JavaScript et Sass
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .version();

// Configuration supplémentaire de Webpack
mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.wasm', '.mjs', '.jsx', '.scss'],
    },
    output: {
        publicPath: '/storage/basset/',  // Assurez-vous que le chemin de sortie est correct
    },
});

// Inclure SweetAlert2 si nécessaire
mix.autoload({
    'sweetalert2': ['Swal'],
});
