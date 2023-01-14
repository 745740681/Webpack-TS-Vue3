import { Boot } from '@wangeditor/editor'
import ScreenShots from './ScreenShots'
const screen_menus = {
    key : 'screen_shots',
    factory : ()=> new ScreenShots(),
}

Boot.registerMenu(screen_menus);