const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: (error) => {
          if (
              error?.message?.includes('ResizeObserver loop completed') ||
              error?.message?.includes('ResizeObserver loop limit exceeded')
          ) {
            return false
          }
          return true
        }
      }
    }
  }
})
