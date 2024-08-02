import DefaultTheme from 'vitepress/theme'
import CustomLayout from './components/CustomLayout.vue'
import 'uno.css'
import { MotionPlugin } from '@vueuse/motion'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

export default {
  extends: DefaultTheme,
  // 使用包装组件重写布局
  Layout: CustomLayout,
  enhanceApp({ app, router, siteData }) {
    app.use(MotionPlugin)
    app.use(ArcoVue);
  }
}
