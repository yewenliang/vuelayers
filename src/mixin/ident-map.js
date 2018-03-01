import Vue from 'vue'
import { IDENTITY_MAP_PROP } from '../core'
import IdentityMap from '../util/identity-map'
import { identity } from '../util/minilo'

export default {
  props: {
    /**
     * Unique key for saving to identity map
     * @type {string|number}
     * @experimental
     */
    ident: [String, Number],
  },
  methods: {
    getFullIdent (...parts) {
      if (!this.ident) return

      return [this.$options.name, this.ident, ...parts].filter(identity).join(':')
    },
  },
  created () {
    this::initIdentityMap()
  },
}

function initIdentityMap () {
  if (!this[IDENTITY_MAP_PROP]) {
    Vue[IDENTITY_MAP_PROP] = Vue.prototype[IDENTITY_MAP_PROP] = new IdentityMap()
  }
  Object.defineProperties(this, {
    $identityMap: {
      enumerable: true,
      get: () => this[IDENTITY_MAP_PROP],
    },
  })
}
