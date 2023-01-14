<template>
  <div class="wang-editor">
    <Toolbar class="tool-bar"
             style="border-bottom: 1px solid #ccc"
             :editor="editor"
             :defaultConfig="tool_conf"
             :mode="mode" />
    <Editor class="editor"
            style="height: 500px; overflow-y: hidden;"
            v-model="valueHtml"
            :defaultConfig="editor_conf"
            :mode="mode"
            @onCreated="handleCreated" />
        
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      mode: 'default',
      tool_conf: {
        toolbarKeys: ['emotion', 'uploadImage'],
        insertKeys  :{
            index:3,
            keys : ['screen_shots'],
        }
      },
      editor_conf: {
        placeholder: '请输入内容...',
      },
      editor: null,
      valueHtml: '',
      menuArr: [],
      keyMap: {},
    }
  },
  mounted() {
    this.register()
  },
  watch: {
    'keyMap.emotion': 'emotionMonitor',
  },
  methods: {
    emotionMonitor(emotion) {
      const emotionElem = this.keyMap['emotion-elem'];
      const parent = this.siblings(emotionElem);
      const target = parent.firstChild;
      const childrens = target.children;
      for (let i = 0; i < childrens.length; i++) {
        const children = childrens[i]
        if (emotion) {
          //注册事件
          children.addEventListener('click', (e) =>
            this.registerFun('emotion-icon', emotionElem),false
          )
        } else {
        
          //销毁事件
          children.removeEventListener('click',(e) =>
            this.registerFun('emotion-icon', emotionElem),false)
        }
      }
    },
    siblings(elem) {
      if (elem.nextElementSibling) {
        return elem.nextElementSibling
      } else {
        const next = elem.nextSibling
        while (next && 1 !== next.nodeType) {
          next = next.nextSibling
        }
        return next
      }
    },
    handleCreated(editor) {
      this.editor = editor
    },
    register() {
      this.eventLoop((menu) => {
        menu.addEventListener('click', (e) => this.registerFun(menu, e), false)
      })
    },
    eventLoop(fn) {
      setTimeout(() => {
        const bars = document.querySelectorAll('.w-e-bar-item')
        for (let i = 0; i < bars.length; i++) {
          const menus = bars[i].children
          for (let j = 0; j < menus.length; j++) {
            const menu = menus[j]
            if (menus[j].className.indexOf('w-e-menu-tooltip-v5') >= 0) {
              this.menuArr.push(menu)
              if (typeof fn === 'function') {
                fn(menu)
              }
            }
          }
        }
      })
    },
    registerFun(elem, e) {
      let key = ''
      if (typeof elem === 'string') {
        key = elem
      } else {
        key = elem.getAttribute('data-menu-key')
      }
      switch (key) {
        case 'emotion':
          this.keyMap[key] = !this.keyMap[key]
          this.keyMap[`${key}-elem`] = elem
          break
        case 'emotion-icon' : 
            e.click();
            break;
      }
    },
    destroy() {
      const { menuArr } = this
      for (const elem of menuArr) {
        elem.removeEventListener('click', this.registerFun, false)
      }
    },
  },
  unmounted() {
    this.destroy()
  },
}
</script>

<style scoped lang="less">
:deep(.w-e-menu-tooltip-v5) > img{
    width:14px;
    height:14px;
}
:deep(.w-e-drop-panel) {
  height: 150px;
  overflow: auto;
}
.wang-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  .tool-bar {
    flex: 0 0 auto;
  }
  .editor {
    flex: 1 1 auto;
  }
}
</style>