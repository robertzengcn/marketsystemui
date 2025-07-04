import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { initToolbar } from '@stagewise/toolbar';
// Debug log
console.log('Environment:', import.meta.env)
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL)


const stagewiseConfig = {
  plugins: [
    {
      displayName: 'Example Plugin',
      pluginName: 'example-plugin',
      description: 'Adds additional context for your components',
      iconSvg: null,
      shortInfoForPrompt: () => {
        return "Context information about the selected element";
      },
      mcp: null,
      actions: [
        {
          name: 'Example Action',
          description: 'Demonstrates a custom action',
          execute: () => {
            window.alert('This is a custom action!');
          },
        },
      ],
    },
  ],
};

function setupStagewise() {
  if (process.env.NODE_ENV === 'development') {
    initToolbar(stagewiseConfig);
  }
}

setupStagewise();
const app = createApp(App)

// Register all Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app') 