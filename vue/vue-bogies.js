/**
 * 格式化时间戳
 * 例: <timestamp-format v-bind:value="timestamp" format="YYYY-MM-DD HH:mm:ss"></timestamp-format>
 */
Vue.component('timestamp-format', {
	props: ['value', 'format'],
	template: '<span>{{ showContent }}</span>',
	data: function () {
		return {
			showContent: moment(this.value).format(this.format)
		}
	},
});
/**
 * 生成一个隐藏部门内容的字符串
 * 例: <td v-mask-string="{src:x.cardId, left:4, right:4, mask:'****'}"></td>
 */
Vue.directive('mask-string', {
	maskString: function(el, param) {
		if (!param.src) {
			el.innerHTML = '';
			return;
		}
		var srcLen = param.src.length;
		if (srcLen < param.right) {
			param.right = srcLen;
		}
		var dst = param.src.substr(0, param.left);
		dst += param.mask;
		dst += param.src.substr(param.src.length-param.right);
		el.innerHTML = dst;
	}, 
	inserted: function (el, binding) {
		binding.def.maskString(el, binding.value);
	}, 
	update: function(el, binding) {
		var param = binding.value;
		// 值没有变化就不更新了
		if (param.src == binding.oldValue.src) {
			return;
		}
		binding.def.maskString(el, param);
	}
});
/**
 * zTree vue 指令
 * 例: <ul class="ztree" v-ztree="treeData"></ul>
 */
Vue.directive('ztree', {
	inserted: function (el, binding) {
		if (binding.value.nodes.length > 0) {
			binding.value.zTree = $.fn.zTree.init($(el), binding.value.setting, binding.value.nodes);
		}
	}, 
	update: function(el, binding) {
		if (binding.value.refresh) {
			binding.value.refresh = false;
			$.fn.zTree.init($(el), binding.value.setting, binding.value.nodes);
		}
	}
});
/**
 * 弹出式zTree vue组件
 * 例: 
 */
Vue.directive('pop-ztree', {
	bind: function (el, binding) {
		el.__onTreeBodyDown__ = function (element) {
			if ($(element.target).parents("#"+binding.value.elId).length > 0) {
				return;
			}
			// 不是点击当前组件时收起
			if ($(el).get(0) !== $(element.target).get(0)) {
				var e = $('#' + binding.value.elId);
				e.fadeOut("fast");
				$("body").unbind("mousedown", el.__onTreeBodyDown__);
				el.__isShowTree__ = false;
			}
		};
		// 是否已经弹出
		el.__isShowTree__ = false;
		var clickHandler = function (element) {
			// 如果没有数据则不弹出
			if (!binding.value.hasNodes) {
				return;
			}
			var bindTree = $('#' + binding.value.elId);
			// 弹出状态时再次点击则收起
			if (el.__isShowTree__) {
				$("body").unbind("mousedown", el.__onTreeBodyDown__);
				bindTree.fadeOut("fast");
				el.__isShowTree__ = false;
				return;
			}

			var offset = element.target.getBoundingClientRect();
			var oh = $(element.target).get(0).offsetHeight;
			bindTree.css({
				left: offset.left + 'px',
				top: (parseInt(offset.top) + oh) + 'px'
			}).slideDown('fast');
			$("body").bind("mousedown", el.__onTreeBodyDown__);
			el.__isShowTree__ = true;
		}
		el.__vueClickOutSide__ = clickHandler
		el.addEventListener('click', clickHandler)
	},
	update: function (el, binding) {
		if (binding.value.reqClose) {
			binding.value.reqClose = false;
			var e = $('#' + binding.value.elId);
			e.fadeOut("fast");
			$("body").unbind("mousedown", el.__onTreeBodyDown__);
			el.__isShowTree__ = false;
		}
	},
	unbind: function (el, binding) {
		document.removeEventListener('click', el.__vueClickOutSide__)
		delete el.__vueClickOutSide__;
	}
});
/**
 * layui 分页指令 {theme: '', pageData: data}
 */
Vue.directive('layui-pagebar', {
	makePagebar: function(el, binding) {
		var param = binding.value;
		var pageData = param.pageData;
		if (!pageData.total) {
			// 没有数据
			el.innerHTML = '';
			return;
		}
		var curPageNum = param.pageData.pageNum;
		if (!curPageNum) {
			curPageNum = 1;
		}
		
		param.layuiPagebar = layui.laypage;
		param.layuiPagebar.render({
			elem: el.id,
			limit: pageData.pageSize, 
			count: pageData.total, 
			curr: curPageNum, 
			jump: function(obj, first) {
				if (first) {
					return;
				}
				// do something
				param.jump(obj.curr);
			}
		});
	}, 
	inserted: function (el, binding) {
		binding.def.makePagebar(el, binding);
	}, 
	update: function(el, binding) {
		if (binding.oldValue.pageData.total == binding.value.pageData.total) {
			return;
		}
		binding.def.makePagebar(el, binding);
	}
});