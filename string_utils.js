window.StringUtils = {
    /** 
    * 去掉字符串头尾空格 
    * @param str 传入的字符串值 
    */  
    trim:function(str) {  
        if(!str || ''==str) {
            return ''
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    /** 
    * 判断值是否为 undefined
    * @param v 值 
    */ 
    isUndefined:function(v) {
        return (typeof(v) === "undefined");
    },
    /** 
     * 是否为Null
     * @param v
     * @returns {Boolean}
     */  
    isNull:function(v) { 
        if(!v) {
            return true;
        } else {
            return false;
        }
    },
    /** 
     * 是否为空字符串，有空格不是空字符串
     * @param str
     * @returns {Boolean}
     */  
    isEmpty:function(str) {
        if(!str || ''==str) {
            return true;  
        } else {
            return false;
        }
    },
    /** 
     * 是否为空字符串，全空格也是空字符串
     * @param str
     * @returns {Boolean}
     */  
    isBlank:function(str) {
        if (this.trim(str) == '') {
            return true;
        } else {
            return false;  
        }
    },
    /** 
     * 是否不为空字符串，全空格也是空字符串
     * @param str
     * @returns {Boolean}
     */  
    isNotBlank:function(str) {
        if (this.trim(str) == '') {
            return false;
        } else {
            return true;  
        }
    }
};
