import '../css/app.css';
import { createSSRApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggyVue';
import { InertiaProgress } from "@inertiajs/progress";


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createSSRApp({ render: () => h(App, props) });

        app.use(ZiggyVue);
        app.use(plugin);
        app.mount(el);
    },
});

InertiaProgress.init({ color: "#000000", showSpinner: true });