import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { watch, onMounted } from 'vue'
import HomeLayout from './HomeLayout.vue'
import { trackPageView } from './lib/analytics'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,
  setup() {
    const route = useRoute()

    // Initialize Vercel Web Analytics (client-side only)
    onMounted(async () => {
      const { inject } = await import('@vercel/analytics')
      inject()
    })

    watch(
      () => route.path,
      (path) => {
        trackPageView(path)
      },
      { immediate: true },
    )
  },
}
