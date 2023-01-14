
import config from './config';
const _https : {[key:string]:string} = {
    user : '/api/v3/user',
    message : '/api/v3/message',
    sdata : '/api/v3/sdata',
}

for (let param in _https){
    _https[param] = config.BASE_URL +  _https[param];
}

export default _https;