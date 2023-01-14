<template>
  <div :class="['service-mod',lock ? 'mod-move' : '' ]"
       ref="mod"
       :style="startStyle"
       @mouseenter="e=>this.handleMouse('移入',e)"
       @mouseleave="e=>this.handleMouse('移出',e)">
    <div v-show="!panel.show"
         class="service-start"
         :style="{cursor : startStyle.cursor}"
         @click="e=>handleMouse('打开面板',e)"
         @mousedown="e=>handleMouse('按下',e)">
      <slot name="button"></slot>
    </div>
    <div class="service-panel"
         v-if="panel.show">
      <slot name="panel"></slot>
    </div>
  </div>
</template>
  
  <script lang="ts">
import common from '@/assets/utils/common';
let lock_time: any = null
export default {
  data() {
    return {
      mouse: {
        //存储位置
        down: {},
        move: {},
        location: {},
        state: false,
      },
      startStyle: {cursor:'default'},
      scope: {
        //存储范围
        max_x: 0,
        min_x: 0,
        max_y: 0,
        min_y: 0,
      },
      reset: false, //位置重置状态
      direction: 'right', //表示浮动按钮向右还是向左重置
      timer: null, //重置位置的定时器
      lock: false, //重置位置期间的访问锁
      panel: {
        //面板开启状态
        show: false,
        state: false,
      },
      w_size:{}
    }
  },
  props: {
    hidden: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    reset: 'resetMonitor',
    hidden: 'hiddenMonitor',
  },
  emits: ['update:hidden'],
  mounted() {
    window.addEventListener(
      'mouseup',
      (e) => this.handleMouse('抬起', e),
      false
    )
    window.addEventListener(
      'mousemove',
      (e) => this.handleMouse('移动', e),
      false
    )
    window.addEventListener('resize', this.handleResize, false)
    this.init()
    this.hiddenMonitor()
  },
  methods: {
    init() {
        this.initWSize();
        const boundary = this.isBoundary()
        const x = boundary.w_max_width
        const y = boundary.w_min_height
        this.setStyle({ x, y })
    },
    initWSize (){//初始化窗口尺寸
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        this.w_size = {width,height};
    },
    resetMonitor(state: boolean) {
      if (state) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if (this.reset) {
            console.log('执行动画，浮动按钮已锁定')
            this.lock = true
            this.animation()
          }
          this.reset = false
        }, 3000)
      }
    },
    hiddenMonitor(hiddenPanel: boolean = this.hidden) {
        if(hiddenPanel){
            this.lock = false;
            this.handleMouse('移出');
        }
      this.panel.show = !hiddenPanel
    },
    setStyle(data: any) {
      const { x: left, y: top ,move} = data;
      let cache = {
        left: left + 'px',
        top: top + 'px',
        display: 'inline-block',
      }
      if(move){
        cache['cursor'] = 'move';
      }else {
        cache['cursor'] = 'pointer';
      }
      this.startStyle = cache;
    },
    handleMouse(type: string, e?: any): void {
      const {
        mouse,
        startStyle: _style,
        $refs: refs,
        scope,
        lock,
        panel,
      } = this
      const boundary = this.isBoundary()
      switch (type) {
        case '按下':
          //位置重置时锁住按下事件
          if (lock) {
            return
          }
          this.mouse = {
            down: {
              //存储鼠标按下的位置
              x: e.pageX,
              y: e.pageY,
            },
            location: {
              //存储浮动按钮的初始位置
              x: common.strToNum(_style.left),
              y: common.strToNum(_style.top),
            },
            state: true, //鼠标状态
          }
          this.panel.state = true //鼠标点击状态
          break
        case '移动':
          if (mouse.state) {
            let x = mouse.location.x + e.pageX - mouse.down.x
            let y = mouse.location.y + e.pageY - mouse.down.y
            if (x >= boundary.w_max_width) {
              x = boundary.w_max_width
            } else if (x <= boundary.w_min_width) {
              x = boundary.w_min_width
            }
            if (y >= boundary.w_max_height) {
              y = boundary.w_max_height
            } else if (y <= boundary.w_min_height) {
              y = boundary.w_min_height
            }
            //设置浮动按钮位置
            this.setStyle({ x, y ,move:true})
            this.panel.state = false //鼠标移动说明当前不是点击事件
            this.mouse.move = { x, y } //存储鼠标移动的最后位置
          }
          break
        case '抬起':
          this.mouse = {
            state: false,
          }
          this.startStyle.cursor = 'pointer';
          break
        case '移入':
            if (lock) {
                return
            }
            if (boundary.w_right_b) {
                //向右重置
                this.reset = false
                console.log('取消执行右侧方向动画')
                clearTimeout(this.timer)
            } else if (boundary.w_left_b) {
                //向左重置
                this.reset = false
                console.log('取消执行左侧方向动画')
            }
            break
        case '移出':
            if (lock) {
                    return
                }
            if (boundary.w_right_b) {
                this.reset = true
                this.direction = 'right'
                console.log('开始执行右侧方向动画')
            } else if (boundary.w_left_b) {
                this.reset = true
                this.direction = 'left'
                console.log('开始执行左侧方向动画')
            }
          break
        case '打开面板':
          if (panel.state) {
            this.panel.show = true;
            this.reset = false;
            this.lock = true;
            console.log('面板弹出，动画已暂停');
            this.$emit('update:hidden', false)
          }
          break
      }
    },
    isBoundary() {
      //是否到达边界
      
      const {
        startStyle: { left, top },w_size
      } = this

      const w_max_width = w_size.width - 60
      const w_min_width = 10
      const w_max_height = w_size.height - 60
      const w_min_height = 10
      const w_width_half = w_size.width / 2
      const _left = left ? common.strToNum(left) : w_max_width
      const _top = top ? common.strToNum(top) : w_min_height

      const w_max_top_b = _top > w_max_height
      const w_min_top_b = _top < w_min_height

      let w_left_b: any = undefined,
        w_right_b: any = undefined
      if (_left > w_width_half) {
        // 右侧
        w_right_b = _left < w_max_width
      } else {
        //左侧
        w_left_b = _left > w_min_width
      }
      return {
        _left,
        _top,
        w_max_width,
        w_min_width,
        w_max_height,
        w_min_height,
        w_left_b,
        w_right_b,
        w_max_top_b,
        w_min_top_b,
        w_width_half,
      }
    },
    handleResize(){
        //屏幕尺寸变化时执行
        this.initWSize();
        const boundary = this.isBoundary()
        let x: number = boundary._left,
          y: number = boundary._top,state = false;

        if (boundary.w_left_b !== undefined && !boundary.w_left_b) {
          //左侧
          x = boundary.w_min_width
        }else {
            state = true;
        }

        if (boundary.w_right_b !== undefined  && !boundary.w_right_b) {
          //右侧
          x = boundary.w_max_width;
        }else {
            state = true;
        }
        if(state){
            clearTimeout(lock_time)
            lock_time = setTimeout(() => {
                this.handleMouse('移出')
                clearTimeout(lock_time)
            }, 100)
        }
        if (boundary.w_max_top_b) {
          y = boundary.w_max_height
        } else if (boundary.w_min_top_b) {
          y = boundary.w_min_height
        }
        const data = {}
        data['x'] = x;
        data['y'] = y;
        if(!state)return;
        this.setStyle(data);
    },
    animation() {
      const boundary = this.isBoundary()
      const { direction } = this
      let x: number = 0,
        y: number = boundary._top
      if (direction === 'left') {
        x = boundary.w_min_width
      } else if (direction === 'right') {
        x = boundary.w_max_width
      }
      this.setStyle({ x, y })
      setTimeout(() => {
        this.lock = false;
        console.log('动画执行完毕，浮动按钮锁以解开')
      }, 500)
    },
  },
  unmounted() {
    window.removeEventListener(
      'mouseup',
      (e) => this.handleMouse('抬起', e),
      false
    )
    window.removeEventListener(
      'mousemove',
      (e) => this.handleMouse('移动', e),
      false
    )
    window.removeEventListener('resize', this.handleResize, false)
  },
}
</script>
  
  <style lang="less" scoped>
.service-mod {
  position: absolute;
  display: none;
  z-index: 100000;
  font-size: 16px;
  .service-start {
    width: 50px;
    height: 50px;
    background-color: #959595;
    cursor: pointer;
    border-radius: 50%;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }
  .service-panel {
    cursor: default;
  }
}
.service-mod.mod-move {
  transition: left 0.5s ease-in;
  cursor: pointer;
}
</style>