module.exports = {
  twin: {
    preset: 'styled-components',
    config: './tailwind.config.js',
    // autoCssProp removed in twin.macro v2.8.2+
    // Use styled-components' css prop directly instead
    hasSuggestions: true,
    dataTwProp: true,
    debugPlugins: false,
    debug: false,
  },
}