/* UMD wrapper for Bootstrap's dom/manipulator.js (compatible with classic scripts)
 * Converted to global/UMD and made catch binding explicit for wider compatibility.
 */
(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    global.Manipulator = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {

  function normalizeData(value) {
    if (value === 'true') {
      return true
    }

    if (value === 'false') {
      return false
    }

    if (value === Number(value).toString()) {
      return Number(value)
    }

    if (value === '' || value === 'null') {
      return null
    }

    if (typeof value !== 'string') {
      return value
    }

    try {
      return JSON.parse(decodeURIComponent(value))
    } catch (e) {
      return value
    }
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function(chr){ return "-" + chr.toLowerCase() })
  }

  var Manipulator = {
    setDataAttribute: function(element, key, value) {
      element.setAttribute("data-bs-" + normalizeDataKey(key), value)
    },

    removeDataAttribute: function(element, key) {
      element.removeAttribute("data-bs-" + normalizeDataKey(key))
    },

    getDataAttributes: function(element) {
      if (!element) {
        return {}
      }

      var attributes = {}
      var ds = element.dataset || {}
      var bsKeys = Object.keys(ds).filter(function(key){ return key.indexOf('bs') === 0 && key.indexOf('bsConfig') !== 0 })

      for (var i = 0; i < bsKeys.length; i++) {
        var key = bsKeys[i]
        var pureKey = key.replace(/^bs/, '')
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length)
        attributes[pureKey] = normalizeData(ds[key])
      }

      return attributes
    },

    getDataAttribute: function(element, key) {
      return normalizeData(element.getAttribute("data-bs-" + normalizeDataKey(key)))
    }
  }

  return Manipulator;
});
