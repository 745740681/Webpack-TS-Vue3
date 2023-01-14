import { createApp } from 'vue';
import 'core-js/stable';
import Main from './src/app.vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@/assets/editor/factory';
import move from './directive/move';
import '@/assets/less/common.less';
import 'x-scrollbar/xscrollbar.css';
import XScrollbar from  'x-scrollbar'

const app = createApp(Main);

app.directive('move',move)

app.component('Editor', Editor);
app.component('Toolbar', Toolbar);
app.config.globalProperties.$xscrollbar = function (elem:Event){
    return new XScrollbar(elem,{
        // 滑块大小
      thumbSize: '4px',
      // 轨道颜色
      trackBackground: '#b1ffa5',
      // 滑块颜色
      thumbBackground: '#0e913f',
      // 滑块圆角大小
      thumbRadius: '0',
    })
}
app.mount('#service');



