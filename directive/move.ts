class MyMouse {
    binding : any = {};
    el : any = {};
    move : {[name:string]:any} = {};
    down : {[name:string]:any} = {};
    _location : {[name:string]:any} = {};
    state : boolean = false;
    w_size :  {[name:string]:any} = {};
    _style : {[name:string]:any} = {}
    constructor (){

    }

    _mousedown = (e:any) => {//按下
        const {el} = this;
        this._location = {
            x : el.offsetLeft,
            y : el.offsetTop,
        }
        this.down = {
            x : e.pageX,
            y : e.pageY
        }
        this.state = true;
        
    }

    _mousemove = (e:any) => {//移动

        const {down,_location,state,binding} = this;
        if(!state){return;}
        let x = _location.x + e.pageX - down.x;
        let y = _location.y + e.pageY - down.y;
        const scope = this._move_scope ();
        if (x >= scope.w_max_width) {
            x = scope.w_max_width
        } else if (x <= scope.w_min_width) {
            x = scope.w_min_width
        }
        if (y >= scope.w_max_height) {
            y = scope.w_max_height
        } else if (y <= scope.w_min_height) {
            y = scope.w_min_height
        }
        const _instance = binding.instance;
        if(_instance){
            this._style = {
                top : y + 'px',
                left : x + 'px',
                cursor : 'move',
            }
            _instance.handleClick('update',this._style);
        }
    }

    _move_scope (){
        const {w_size} = this;
        const w_max_width = w_size.width - 250 -10;
        const w_min_width = 250 + 10;
        const w_max_height = w_size.height - 250 - 10;
        const w_min_height = 250 + 10;
        return {w_max_width,w_min_width,w_max_height,w_min_height}
    }

    _mouseup = (e:any) => {//抬起
        const {binding} = this;
        const _instance = binding.instance;
        this.state = false;
        this._style.cursor = 'default';
        if(_instance){
            _instance.handleClick('update',this._style);
        }
    }
    
    _register (fn:Function,data:any):any{
        if(data.binding){
            this.binding = data.binding;
        }
        if(data.el){
            this.el = data.el;
        }
        if(typeof (fn) === 'function'){
            return fn;
        }
        return function(){
            console.warn('传入的函数无效！')
        }
    }

    _w_size (){
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        console.log(width,height);
        
        this.w_size = {width,height};
    }
}

let my_mouse = new MyMouse();

export default {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el, binding, vnode, prevVnode) {
        // 下面会介绍各个参数的细节
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding, vnode, prevVnode) {
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el, binding, vnode, prevVnode) {
        let elem:any=false;
        if(binding.value){
            elem = document.querySelector(`.${binding.value}`);
        }
        
        my_mouse._w_size();
        el.addEventListener('mousedown',my_mouse._register(my_mouse._mousedown,{el: elem || el,binding}),false)
        //抬起
        window.addEventListener('mouseup',my_mouse._register(my_mouse._mouseup,{el : elem || el,binding}),false);
        //移动
        window.addEventListener('mousemove',my_mouse._register(my_mouse._mousemove,{el : elem || el,binding}),false);

        window.addEventListener('resize',my_mouse._w_size,false)
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el, binding, vnode, prevVnode) {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el, binding, vnode, prevVnode) {},
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode, prevVnode) {},
    // 绑定元素的父组件卸载后调用
    unmounted(el, binding, vnode, prevVnode) {
        el.removeEventListener('mousedown',my_mouse._register(my_mouse._mousedown,{el}),false);
        window.removeEventListener('mousemove',my_mouse._register(my_mouse._mousemove,{el}),false);
        window.removeEventListener('mouseup',my_mouse._register(my_mouse._mouseup,{el}),false);
        window.removeEventListener('resize',my_mouse._w_size,false);
    },

}