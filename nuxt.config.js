const pkg = require('./package.json');

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'graphic',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: 'https://publicintegrity.org/wp-content/themes/cpi/static/img/favicon/favicon-32x32.png'
            },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
            }
        ]
    },
    modules: [
        '@nuxtjs/axios',
        [
            '@nuxtjs/google-analytics',
            {
                id: 'UA-3383794-4',
                debug: {
                    sendHitTask: !(
                        typeof document !== 'undefined' &&
                        document &&
                        document.referrer &&
                        document.referrer.indexOf('publicintegrity.org') !== -1
                    )
                }
            }
        ]
    ],
    plugins: [
        { src: '~/plugins/pym.js', ssr: false },
        { src: '~/plugins/chartbeat.js', ssr: false },
        { src: '~/plugins/codemirror.js', ssr: false },
        '~/plugins/vuetify.js'
    ],
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    axios: {
        baseURL: process.server
            ? `http://${process.env.HOST || 'localhost'}:${process.env.PORT ||
                  3000}`
            : `/${pkg.name}/`
    },
    router: {
        base: `/${pkg.name}/`
    },
    /*
     ** Global CSS
     */
    css: [
        '~/assets/css/site.css',
        '~/assets/css/main.styl',
        'codemirror/lib/codemirror.css'
    ],
    /*
     ** Add axios globally
     */
    build: {
        html: {
            minify: {
                collapseWhitespace: false,
                removeEmptyAttributes: false
            }
        },
        /*
         ** Run ESLINT on save
         */
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.(csv)$/,
                loader: 'dsv-loader',
                exclude: /(node_modules)/
            });

            if (ctx.isClient && process.env.NODE_ENV !== 'production') {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
