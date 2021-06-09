const schemeMixin = function schemeMixin(schemes) {
  return {
    props: {
      scheme: {
        validator: function (value) {
          return [...schemes].indexOf(value) !== -1
        }
      }
    },
    computed: {
      schemeClassName() {
        return this.$style[this.scheme];
      }
    }
  }
}

export default schemeMixin;
