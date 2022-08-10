module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['inline-dotenv'],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@components': './src/components',
            '@libs': './src/libs',
            '@contexts': './src/contexts',
            '@dtos': './src/dtos',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@global': './src/global',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@helpers': './src/helpers',
            '@constants': './src/constants'
          }
        }
      ]
    ]
  }
}
