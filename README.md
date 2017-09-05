# vuex-action-reload
A vuex plugin that reloads actions when a condition is met

## Installation

```
npm install vuex-action-reload
```

## Usage

```
import createVuexReloadPlugin from 'vuex-action-reload'

const store = new Vuex.Store({
  // ...
  plugins: [
    createVuexReloadPlugin({
      actions: ['loadNews', 'Posts/loadLatest'],
      condition: mutation => mutation.type === 'Locale/setLocale'
      })
    ]
})

```

In this example, the actions `loadNews` and `Posts/loadLatest` will be dispatched
every time a mutation of `Locale/setLocale` occurs.

## API

```
createVuexReloadPlugin([options])
```

Creates a new instance of the plugin with the given options.
The following options can be provided to configure the plugin for your specific needs:

* `actions <Array>` an array of actions that should be "reloaded" (dispatched)
when `condition` is met

* `condition <Function:Boolean>` A function returning a Boolean deciding which store mutations
should trigger a reload of `actions`. This function receives an object from vuex
containing `type` (name of mutation) and `payload` (the payload the mutation receives).

## Credits

Thank you to [Robin van der Vleuten](https://www.robinvdvleuten.nl/) for the inspiration
from his [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) plugin.

## License

MIT © Christof Leuenberger
