<template>

    <div class="x-scroll" ref="scrollbar">
        <slot></slot>
    </div>
</template> 

<script lang="ts">
    export default {
        data (){
            return {
                container : null,
                scroll_max_h : 0,
            }
        },
        mounted (){
            const {$refs:refs} = this;
            const xscrollbar = this.$xscrollbar(refs.scrollbar);
            this.container = xscrollbar.$container
            xscrollbar.$container.addEventListener('scroll',this.handleScroll,false);
            this.handleScroll();
        },
        methods : {
            handleScroll (){
                const {$refs:refs} = this;
                let vessel_h:any = document.querySelector('.x-scrollbar__content') || 0;
                let scroll_h = refs.scrollbar
                if(vessel_h){
                    vessel_h = vessel_h.offsetHeight;
                }
                if(scroll_h){
                    scroll_h = scroll_h.offsetHeight;
                }
                this.scroll_max_h = vessel_h - scroll_h;
            },
        }
    }
</script>


<style scoped lang="less">
    .x-scroll{
        position: absolute;
        height: 100%;
        overflow: auto;
        top: 10px;
        right: 0;
        bottom: 10px;
        left: 0;
        
    }
</style>