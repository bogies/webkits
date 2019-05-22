/// Tommy Micro Service Promise
window.HeaderConstants = {
    URI: 'XV-URI', 
    METHOD: 'XV-METHOD'
};

/**
 * 设置请求数据
 * @note data 只支持 key: value, value 不支持对象([], {}) 
 */
function tmspParams(p) {
    if (p) {
        this.service = p.service;
        this.url = p.url;
        this.method = p.method;
        this.data = p.data;
        this.loading = p.loading;
    } else {
        this.service = '';
        this.url = '';
        this.method = 'GET';
        this.data = {none: 'none'};
        this.loading = null;
    }

    this.setService = function(s) { this.service = s; }
    this.setUrl = function(url) { this.url = url; }
    this.setMethod = function(m) { this.method = m; }
    this.setMethodPost = function() { this.method = 'POST'; }
    this.setMethodPut = function() { this.method = 'PUT'; }
    this.setMethodDelete = function() { this.method = 'DELETE'; }
    this.setData = function(data) { this.data = data; }
    this.setLoading = function(l) { this.loading = l; }
}
/**
 * 请求数据
 * @param {object} p {service:服务名称', url:'服务地址', method:'请求方式', data:{key:value,...},loading:{el:'显示loading的HTML元素',p:{参考: jquery.loading.js=>Loading.defaults}}}
 * @note: data 只支持 key: value, value 不支持对象([], {});URI_DOMAIN 一在 webkits.jsp中定义
 */
function Tmsp(p) {
    if (!p.data) {
        p.data = {none:'none'};
    }
    var serviceUrl = encodeURI(p.service+p.url);
    var pro = new Promise(function(resolve, reject) {
        $.ajax({
            url: URI_DOMAIN+'/s/do.jsd',
            type: 'POST',
            data: p.data,
            dataType: 'JSON',
            beforeSend:function(req) {
                if (p.loading) {
                    p.loading.el.loading(p.loading.p);
                }
                req.setRequestHeader(HeaderConstants.METHOD, p.method);
                req.setRequestHeader(HeaderConstants.URI, serviceUrl);
            },
            success: function(result) {
                if (p.loading) {
                    p.loading.el.loading('toggle');
                }
                if (200 == result.code) {
                    resolve(result);
                } else {
                    reject(result);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (p.loading) {
                    p.loading.el.loading('toggle');
                }
                reject(new Error(textStatus));
            }
        });
    });

    return pro;
}
