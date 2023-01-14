<template>
    <div class="panel-main">
        <template v-for="item in datasource">
            <div :class="['panel-item',item.role ? 'you' : 'me']" >
                <div class="item-contnt">
                    <img class="user-icon" src="@/assets/media/images/service.png" alt="">
                    <span class="contnt-context">{{item.content}}</span>
                    <i class="sign"></i>
                </div>
            </div>
            <div class="panel-item time" v-if="!!item.time">{{item.time}}</div>
        </template>
        
    </div>
</template>

<script lang="ts">
    const MEDIA_TYPE = {
        '文本' : 0,
        '文件' : 1,
    }
    export default {
        data (){
            return {
                datasource : [
                    {key : '1', role: 0,type:0,content:'纵使你脚纵使你脚下有一千名挑战者纵使你脚下有一千名挑战者纵使你脚下有一千名挑战者纵使你脚下有一千名挑战者纵使你脚下有一千名挑战者下有一千名挑战者'},
                    {key : '2', role: 1,type:0,content:'纵使你脚纵使你脚下有一千名挑战者纵使你脚下有一千名挑战者纵使你脚下有一千名挑战者纵使你脚下有一千名挑战者纵使你脚下有一千名挑战者下有一千名挑战者'},
                    {key : '3', role: 1,type:0,time:'昨天：16:18',content:'飘满了死者弯曲的倒影'},
                    {key : '4', role: 0,type:0,content:'冰川纪过去了'},
                    {key : '5', role: 1,type:0,content:'为什么到处都是冰凌'},
                    {key : '6', role: 1,type:0,content:'好望角发现了'},
                    {key : '7', role: 0,type:0,content:'为什么死海里千帆相竞'},
                    {key : '8', role: 0,type:0,content:'我来到这个世界上'},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .panel-main{
        //width:100%;
        height:100%;
        
        .panel-item{
            display: flex;
            padding:0 10px;
            margin-bottom: 10px;
            .item-contnt{
                position: relative;
                padding:10px 0;
                display: flex;
                
                .user-icon{
                    width:40px;
                    height:40px;
                    flex:0 0 auto;
                }
                .contnt-context{
                    padding:10px;
                    background-color: #e6e6e6;
                    border-radius: 5px;
                }
                
            }
        }
        .panel-item.me {
            flex-direction: row-reverse;
            .item-contnt{
                flex-direction: row-reverse;
                .user-icon{
                    margin-left:10px;
                }
                .sign{
                    position: absolute;
                    border: 10px solid #e6e6e6;
                    top: 20px;
                    right: 30px;

                    border-top-color: transparent;
                    border-bottom-color: transparent;
                    border-right-color: transparent;
                    border-width: 8px 10px;
                }
            }

        }
        .panel-item.you {
            flex-direction: row;
            .item-contnt{
                flex-direction: row;
                .user-icon{
                    margin-right:10px;
                }
                .sign{
                    position: absolute;
                    border: 10px solid #e6e6e6;
                    top: 20px;
                    left: 30px;
                    border-top-color: transparent;
                    border-bottom-color: transparent;
                    border-left-color: transparent;
                    border-width: 8px 10px;
                }
            }
        }

        .panel-item.time{
            font-size: 14px;
            justify-content: center;
            color:#e5e5e5;
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Chrome/Safari/Opera */
            -khtml-user-select: none; /* Konqueror */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently not supported by any browser */
        }
    }
</style>