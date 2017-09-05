import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createVuexReloadPlugin from '../dist/vuex-action-reload'

Vue.use(Vuex)

const conditionHandler = jest
  .fn()
  .mockImplementation(mutation => mutation.type === 'triggerStateChange')
const actionToBeCalled = jest.fn()
const actionNotToBeCalled = jest.fn()

const store = new Store({
  state: {
    foo: 'bar'
  },

  actions: {
    reloadThis: actionToBeCalled,
    dontReloadThis: actionNotToBeCalled
  },
  
  mutations: {
    triggerStateChange: state => {
      state.foo = 'baz'
    }
  },
  
  plugins: [
    createVuexReloadPlugin({
      actions: ['reloadThis'],
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

test('registered action is reloaded', () => {
  store.commit('triggerStateChange')
  expect(actionToBeCalled).toBeCalled()
})

test('non-registered action is not reloaded', () => {
  store.commit('triggerStateChange')
  expect(actionNotToBeCalled).toHaveBeenCalledTimes(0)
})
