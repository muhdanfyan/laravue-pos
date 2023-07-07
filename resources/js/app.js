import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import route from "ziggy-js";

// Plugin
import Notifications from "notiwind";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Font Awesome Setup
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far);

createInertiaApp({
    resolve: async (name) => {
        const context = require.context("./Pages", true, /\.vue$/);
        const modulePath = context.keys().find((path) =>
          path.includes(`./${name}.vue`)
        );
        
        if (modulePath) {
          const module = await import(`./Pages/${modulePath.slice(2)}`);
          return module.default || null;
        }
        
        return null;
      },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .mixin({ methods: { route } })
            .use(plugin)
            .use(Notifications)
            .component("font-awesome-icon", FontAwesomeIcon)
            .component('Datepicker', Datepicker)
            .mount(el);
    },
});

InertiaProgress.init();