
import axios from 'axios';
import _https from '@/assets/config/_https';
import common from '@/assets/utils/common';

export default new class Ajax {

    // 登录
    login (){
        const formData = new FormData();
        formData.append('login','');
        return new Promise((resolve)=>{
            axios.post(_https.user,formData).then(data=>{
                if(data.status === 200 && data.data) {
                    const obj = data.data;
                    if(obj.status){
                        window.localStorage.setItem('service_token',obj.data);
                        resolve(true)
                    }
                }
            }).catch(error=>{
                console.error(error)
            })
        })
    }

    // 退出
    logout (){
        const formData = new FormData();
        formData.append('logout','');
        axios.post(_https.user,formData).then(data=>{
            if(data.status === 200 && data.data) {
                const obj = data.data;
                if(obj.status){
                    window.localStorage.removeItem('service_token');
                }
            }
        }).catch(error=>{
            console.error(error)
        })
    }

    // 获取消息类型
    message_type (){
        const request = {
            message_type : true,
        }
        axios.get(_https.message + common.objTurnParams(request),{
            headers : this.set_headers(),
        }).then(data=>{
            console.log(data)
        }).catch (error=>{
            console.error(error)
        })
    }

    // 获取历史消息
    get_message (){
        const request = {
            touser : true,
        }
        axios.get(_https.message + common.objTurnParams(request),{
            headers : this.set_headers(),
        }).then(data=>{
            console.log(data);
        }).catch(error=>{
            console.log(error)
        })
    }

    // 获取所有用户
    get_users (){
        const request = {
            get_plat_users : true,
        }
        
        axios.get(_https.user + common.objTurnParams(request),{
            headers : this.set_headers(),
        }).then(data=>{
            console.log(data);
        }).catch(error=>{
            console.error(error)
        })
    }

    set_headers () : any{
        const service_token = window.localStorage.getItem('service_token');
        return {
            Authorization : 'JWT ' + service_token,
        }
    }
};

