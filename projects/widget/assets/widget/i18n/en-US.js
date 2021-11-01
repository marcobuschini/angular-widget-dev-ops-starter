;(function(root, G) {
  if (typeof define === 'function' && define.amd) {
    define(G)
  } else if (typeof exports === 'object') {
    module.exports = G
  } else {
    root.en_US = G
  }
})(this, {
  ADD_TO_CART: function(d) {
    return 'Add to cart'
  },
  COLLAPSE: function(d) {
    return 'Collapse'
  },
  EXPAND: function(d) {
    return 'Expand'
  },
})
