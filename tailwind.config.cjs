const defaultTheme = require('tailwindcss/defaultTheme');

const light = {
	primary: '#0d9df8',
	'primary-focus': '#065bcb',
	'primary-content': '#ffffff',
	secondary: '#f000b8',
	'secondary-focus': '#bd0091',
	'secondary-content': '#ffffff',
	accent: '#37cdbe',
	'accent-focus': '#2aa79b',
	'accent-content': '#ffffff',
	neutral: '#3d4451',
	'neutral-focus': '#2a2e37',
	'neutral-content': '#ffffff',
	'base-100': '#ffffff',
	'base-200': '#f9fafb',
	'base-300': '#d1d5db',
	'base-content': '#1f2937',
	info: '#1463ff',
	success: '#00db5f',
	warning: '#ff9900',
	error: '#ff2445',
	'--scrollbg': 'rgba(255, 255, 255, 0);',
	'--scrollbghover': '#f4f4f400;',
	'--cardTipBg': 'rgba(235, 235, 235, 0.95);',
	'--cardScrollbg': 'rgba(41, 41, 41, 0.836);',

	'--herograd1': '#f5861f',
	'--herograd2': '#f32e8a',
	'--herograd3': '#2c88dd',

	'--preherograd1': '#F57A0C',
	'--preherograd2': '#F3E138',
	'--preherograd3': '#DD478C'
};
const dark = {
	primary: '#0d9df8',
	'primary-focus': '#065bcb',
	'primary-content': '#ffffff',
	secondary: '#f000b8',
	'secondary-focus': '#bd0091',
	'secondary-content': '#ffffff',
	accent: '#37cdbe',
	'accent-focus': '#2aa79b',
	'accent-content': '#ffffff',
	neutral: '#616161',
	'neutral-focus': '#434242',
	'neutral-content': '#ffffff',
	'base-100': '#1c1c1c', //'#2e2e2e',
	'base-200': '#212121',
	'base-300': '#0d0d0d',
	'base-content': '#f5f5f5',
	info: '#5cc9ff',
	success: '#00db5f',
	warning: '#ff9900',
	error: '#ff2445',
	'--scrollbg': 'rgba(255, 255, 255, 0);',
	'--scrollbghover': '#f4f4f400;',
	'--cardTipBg': 'rgba(12, 12, 12, 0.95);',
	'--cardScrollbg': '#e7e7e7ad;',

	'--herograd1': 'rgba(0, 93, 180, 0.938)',
	'--herograd2': '#ec4899',
	'--herograd3': '#2c88dd',

	'--preherograd1': '#D84305',
	'--preherograd2': '#D80530',
	'--preherograd3': '#FF8913'
};
module.exports = {
	// ...
	mode: 'jit', // ⚠ Make sure to have this
	//purge: ['./src/**/*.svelte'],
	// ...
	content: ['./src/**/*.{html,js,svelte,ts}'],
	//safelist: [{ pattern: /data-theme$/ }],
	/*purge: {
		options: {
		  safelist: [/data-theme$/],
		},
	  },*/
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		require('daisyui')
	],

	theme: {
		extend: {
			transitionProperty: {
				maxheight: 'max-height'
			}
		},
		screens: {
			xs: { max: '639px' },
			...defaultTheme.screens
		}
	},

	// Plugins;
	daisyui: {
		themes: [
			{
				light: {
					...light,
					'--ayowtf':
						'url("/dash_hero_light.webp");'
				}
			},
			{
				dark: {
					...dark,
					'--ayowtf':
						'url("/dash_hero.webp");'
				}
			},
			{
				dark_premium: {
					...dark,
					primary: '#f86f0d',
					'primary-focus': '#cb3e06',
					'--ayowtf':
						'url("/dash_hero2_test.png");'
				}
			},
			{
				light_premium: {
					...light,
					primary: '#f86f0d',
					'primary-focus': '#cb3e06',
					'--ayowtf':
						'url("/dash_hero2_light.webp");'
				}
			},
			{
				dark_beta: {
					...dark,
					primary: '#7c3aed',
					'primary-focus': '#6506cb',
					'--ayowtf':
						'url("/dash_hero_beta.webp");'
				}
			},
			{
				light_beta: {
					...light,
					primary: '#7c3aed',
					'primary-focus': '#6506cb',
					'--ayowtf':
						'url("/dash_light_beta.webp");'
				}
			},
			{
				dark_vip: {
					...dark,
					primary: '#db2777',
					'primary-focus': '#cb065f',
					'--ayowtf':
						'url("/dash_hero_vip.webp");'
				}
			},
			{
				light_vip: {
					...light,
					primary: '#db2777',
					'primary-focus': '#cb065f',
					'--ayowtf':
						'url("/dash_hero_vip_light.webp");'
				}
			}
		]
	}
};
