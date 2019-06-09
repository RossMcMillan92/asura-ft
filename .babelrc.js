module.exports = function(api) {
  api.cache(true)

  return {
    env: {
      development: {
        presets: ['next/babel'],
        plugins: [['module-resolver', { root: ['./src'] }]]
      },
      production: {
        presets: ['next/babel'],
        plugins: [['module-resolver', { root: ['./src'] }], 'lodash']
      },
      test: {
        presets: [['next/babel']],
        plugins: [['module-resolver', { root: ['./src'] }]]
      }
    }
  }
}
