import { Configuration } from '@nuxt/types';
import * as pkg from './package.json';

const SHARED_BROWSERSLIST = [
	'and not ie 11',
	'and not ie_mob 11',
	'and not safari < 12',
	'and not op_mini all',
	'and not kaios 2.5',
	'and not baidu 7.12',
	'and not and_uc 12.12',
	'and not and_qq 1.2',
	'and not ios_saf < 12.4',
	'and not chrome < 63',
	'and not op_mob 46',
	'and not and_chr 78',
	'and not and_ff 68',
	'and not android 76',
	'and not dead',
];

const config: Configuration = {
	mode: 'spa',
	server: {
		host: '',
	},

	head: {
		title: 'GAwesomeBot',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no' },
			{ name: 'author', content: 'GAwesomeBot.com' },
			{ hid: 'description', name: 'description', content: pkg.description },
			{ name: 'twitter:card', content: 'summary' },
			{ name: 'twitter:site', content: '@GAwesomeBot' },
			{ name: 'twitter:title', content: 'GAwesomeBot' },
			{ name: 'twitter:description', content: pkg.description },
			{ name: 'twitter:image', content: '/logo.png' },
			{ name: 'og:type', content: 'article' },
			{ name: 'og:title', content: 'GAwesomeBot' },
			{ name: 'og:description', content: pkg.description },
			{ name: 'og:image', content: '/logo.png' },
			{ name: 'og:locale', content: 'en_US' },
			{ name: 'og:site_name', content: 'GAwesomeBot.com' },
			{ name: 'og:url', content: 'https://GAwesomeBot.com/' },
			{ name: 'theme-color', content: '#363636' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
			{ rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' },
		],
	},

	loading: { color: '#448fa3' },

	srcDir: 'src/',

	css: [],

	plugins: [],

	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/vuetify',
		'nuxt-i18n',
	],

	vuetify: {
		treeShake: true,
		// Read the vuetify docs & https://github.com/nuxt-community/vuetify-module
		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
		theme: {
			options: {
				customProperties: true,
			},
			dark: true,
			themes: {
				light: {
					primary: '#00d1b2',
					secondary: '#f5f5f5',
					accent: '#00d1b2',
					error: '#f14668',
					info: '#3298dc',
					success: '#48c774',
					warning: '#ffdd57',
				},
				dark: {
					primary: '#3298dc',
					secondary: '#424242',
					accent: '#2196F3',
					error: '#f14668',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FB8C00',
				},
			},
		},
		icons: {
			iconfont: 'mdiSvg',
			values: {},
		},
		defaultAssets: {
			icons: 'mdi',
			font: {
				family: 'Montserrat',
			},
		},
	},

	buildModules: [
		'@nuxt/typescript-build',
	],

	build: {
		babel: {
			presets() {
				return [
					[
						'@nuxt/babel-preset-app',
						{
							targets: {
								browsers: [
									[
										'> .25%',
										...SHARED_BROWSERSLIST,
										'or',
										'last 4 versions',
										...SHARED_BROWSERSLIST,
									].join(' '),
								],
							},
							corejs: { version: 3 },
						},
					],
				];
			},
		},
	},
};

export default config;
