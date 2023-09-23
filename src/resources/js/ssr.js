import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { ZiggyVue } from 'ziggyVue';
import { Ziggy } from './ziggy';


createServer(page =>
	createInertiaApp({
		page,
		render: renderToString,
		resolve: name => {
			const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
			return pages[`./Pages/${name}.vue`]
		},
		setup({ App, props, plugin }) {
			const ssr = createSSRApp({ render: () => h(App, props) });

			ssr.use(ZiggyVue, Ziggy);
			ssr.use(plugin);

			return ssr;
		},
	}),
)
