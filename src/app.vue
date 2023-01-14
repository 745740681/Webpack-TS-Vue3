<template>
    <div class="session-client">
        <HoverButton v-model:hidden="hiddenPanel">
            <template #button>
                点击触发
            </template>
            <template #panel>
                <div class="client-panel" :style="_style">
                    <div class="panel-head" v-move="'client-panel'">
                        <div class="panel-logo"></div>
                        <div class="panel-title"></div>
                        <div class="panel-option">
                            <img title="关闭会话" src="@/assets/media/images/switch.png" @click="e=>this.handleClick('关闭会话',e)" alt="关闭会话" class="icon icon-caidan">
                            <img title="关闭面板" src="@/assets/media/images/close.png" @click="e=>this.handleClick('关闭面板',e)" alt="关闭面板" class="icon icon-guanbi">
                        </div>
                    </div>
                    <div class="panel-body">
                        <Scroll>
                            <DisplayPanel></DisplayPanel>
                        </Scroll>
                        
                    </div>
                    <div class="panel-footer">
                        <Editor></Editor>
                    </div>
                </div>
            </template>
        </HoverButton>
    </div>
</template>

<script lang="ts">
    import HoverButton from '@/components/common/HoverButton.vue';
    import Editor from '@/components/common/Editor.vue';
    import Scroll from '@/components/common/Scroll.vue';
    import DisplayPanel from '@/components/common/DisplayPanel.vue';
    import request from '@/assets/utils/request';
    export default {
        data (){
            return {
                hiddenPanel : true,
                _style : {},
                messageData : [],
            }
        },
        watch : {
            hiddenPanel : 'monitoring',
        },
        methods : {
            handleClick (type,data){
                switch (type){
                    case '关闭面板' : 
                        this.hiddenPanel = true;
                        break;
                    case '关闭会话' : 
                        this.hiddenPanel = true;
                        request.logout();
                        break;
                    case 'update' : 
                        this._style = {...data};
                        break;
                }
            },
            
            monitoring (hiddenPanel:boolean){
                const token = localStorage.getItem('token');
                if(!hiddenPanel && !token){
                    request.login().then(succeed=>{
                        if(succeed){
                            request.get_message();
                        }
                    });
                }else if(!hiddenPanel){
                    request.get_message();
                }
            },

            
        },
        components : {
            HoverButton,
            Editor,
            Scroll,
            DisplayPanel
        },
    }
</script>

<style scoped lang="less">
    @import url('./assets/font/iconfont.css');
    @import url('@wangeditor/editor/dist/css/style.css');
    .session-client{
        .client-panel{
            position: fixed;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            width:500px;
            height:500px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 10px #e2e2e2;
            
            .panel-head{
                height:40px;
                width:100%;
                flex:0 0 auto;
                display: flex;
                background-color: #e2e2e2;
                -webkit-user-select: none; /* Chrome/Safari/Opera */
                -khtml-user-select: none; /* Konqueror */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently not supported by any browser */
                .panel-logo{
                    width:150px;
                    flex:0 0 auto;
                    background-color: aqua;
                }
                .panel-title{
                    flex:1 1 auto;
                    background-color: #556526;
                }
                .panel-option{
                    width:100px;
                    flex:0 0 auto;
                    color:#FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right:10px;
                    >img{
                        width:20px;
                        height:20px;
                        cursor: pointer;
                        -webkit-touch-callout: none; /* iOS Safari */
                        -webkit-user-select: none; /* Chrome/Safari/Opera */
                        -khtml-user-select: none; /* Konqueror */
                        -moz-user-select: none; /* Firefox */
                        -ms-user-select: none; /* Internet Explorer/Edge */
                        user-select: none; /* Non-prefixed version, currently not supported by any browser */
                        margin-left:10px;
                    }
                    >span:first-child{
                        margin-left:0;
                    }
                }
            }
            .panel-body{
                position: relative;
                flex:1 1 auto;
                background-color: #FFF;
            }
            .panel-footer{
                height:150px;
                width:100%;
                flex:0 0 auto;
            }
        }
    }
</style>