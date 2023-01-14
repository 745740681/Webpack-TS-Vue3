export default new  class Common {

    /**
     * 将字符转数字
     * @param str 
     */
    strToNum (str:string) : number{
        return parseInt(str.replace(/[^\d]/g, ""));
    }

    objTurnParams (params : any) : string {
        if (!params) return '';
		let cache:Array<string> = [];
		for (let param in params) {
			cache.push(param + '=' + params[param]);
		}
		if (cache.length) {
			return '?' + cache.join('&');
		} else {
			return '';
		}
    }
}
