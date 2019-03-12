/**
 * 格式化时间戳
 * 例: <time-format value="1111" format="YYYY-MM-DD HH:mm:ss"></time-format>
 */
Vue.component('time-format', {
    props: ['value', 'format'],
    template: '{{ showContent }}',
    data: function () {
      return {
        showContent: moment(this.message).format(this.format)
      }
    },
});
