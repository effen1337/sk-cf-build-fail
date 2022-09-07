/** @type {import('@sveltejs/kit').Config} */

let adapterType = 'pages';

import node_adapter from '@sveltejs/adapter-node';
import cf_adapter from '@sveltejs/adapter-cloudflare-workers';
import cf_page_adapter from '@sveltejs/adapter-cloudflare';

const adapter = adapterType == 'node' ? node_adapter : adapterType == 'workers' ? cf_adapter : cf_page_adapter;
export default {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		//target: '#svelte',
		adapter: adapterType == 'node' ? adapter({
						// default options are shown
						out: 'build',
						precompress: false
						/*env: {
				host: 'HOST',
				port: 'PORT'
			}*/
		}) : adapter()
	}
};
