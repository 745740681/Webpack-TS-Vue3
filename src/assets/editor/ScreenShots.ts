import { IButtonMenu ,IDomEditor} from '@wangeditor/editor';
import screenshots from '@/assets/media/images/screenshot.png';
import ScreenShot from "js-web-screen-shot";
export default class ScreenShots implements IButtonMenu {
    title : string;
    tag : string;
    iconSvg : string;
    constructor() {
        this.title = 'My menu title'; // 自定义菜单标题
        this.iconSvg = `<img class='icon-svg' src='${screenshots}' alt=''>` // 可选
        this.tag = 'button';
    }

    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(editor: IDomEditor): string | boolean {   // TS 语法
    // getValue(editor) {                              // JS 语法
        return ''
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(editor: IDomEditor): boolean {  // TS 语法
    // isActive(editor) {                    // JS 语法
        return false
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(editor: IDomEditor): boolean {   // TS 语法
    // isDisabled(editor) {                     // JS 语法
        return false
    }

    // 点击菜单时触发的函数
    exec(editor: IDomEditor, value: string) {   // TS 语法
    // exec(editor, value) {    
        console.log(1111);
                                  // JS 语法
        new ScreenShot({
            enableWebRtc: false,  //是否显示选项框
            level:99,  //层级级别
            completeCallback: ()=>{
                console.log('截屏成功');
            },
            closeCallback: ()=>{
                console.log('关闭了截屏');
                
            },
        });
        if (this.isDisabled(editor)) return
        editor.insertText(value) // value 即 this.value(editor) 的返回值
    }
}