import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createVuexReloadPlugin from '../dist/vuex-action-reload'

Vue.use(Vuex)

const conditionHandler = jest
  .fn()
  .mockImplementation(mutation => mutation.type === 'triggerStateChange')
const actionToBeCalled = jest.fn()
const actionToAlsoBeCalled = jest.fn()
const actionNotToBeCalled = jest.fn()

const store = new Store({
  state: {
    foo: 'bar'
  },

  actions: {
    reloadThis: actionToBeCalled,
    alsoReloadThis: actionToAlsoBeCalled,
    dontReloadThis: actionNotToBeCalled
  },
  
  mutations: {
    triggerStateChange: state => {}
  },
  
  plugins: [
    createVuexReloadPlugin({
      actions: ['reloadThis', 'alsoReloadThis'],
      condition: conditionHandler
    })
  ]
})

test('condition handler receives vuex mutation', () => {
  store.commit('triggerStateChange')
  expect(conditionHandler).toHaveBeenCalledWith({
    type: 'triggerStateChange'
  })
})

test('all registered actions are reloaded', () => {
  store.commit('triggerStateChange')
  expect(actionToBeCalled).toBeCalled()
  expect(actionToAlsoBeCalled).toBeCalled()
})

test('non-registered action is not reloaded', () => {
  store.commit('triggerStateChange')
  expect(actionNotToBeCalled).toHaveBeenCalledTimes(0)
})
