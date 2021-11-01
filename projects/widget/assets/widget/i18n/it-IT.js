;(function(root, G) {
  if (typeof define === 'function' && define.amd) {
    define(G)
  } else if (typeof exports === 'object') {
    module.exports = G
  } else {
    root.it_IT = G
  }
})(this, {
  ADD_TO_CART: function(d) {
    return 'Aggiungi al carrello'
  },
  COLLAPSE: function(d) {
    return 'Riduci'
  },
  EXPAND: function(d) {
    return 'Espandi'
  },
})
