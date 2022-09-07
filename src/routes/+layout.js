
import { browser } from '$app/environment';
import { register, waitLocale, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('$lib/translations/en.json'));
//register('en-US', () => import('$lib/translations/en.json'));
//register('fr', () => import('$lib/translations/fr.json'));
//register('hi', () => import('$lib/translations/hi.json'));

/*

init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
	
	*/

if (browser) {
	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
}

export const load = async ({ url, params }) => {
	if (!browser) {
		// init on server side only, need to get query from `page.query.get("lang")`
		init({
			fallbackLocale: 'en',
			initialLocale: 'en' //page.query.get("lang"),
		});
	}
	await waitLocale();

	return {};
};
