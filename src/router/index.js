import { createRouter, createWebHistory } from 'vue-router'
import Quotes from '../modules/quotes/views/Quotes.vue'
import QuoteDetails from '../modules/quotes/views/QuoteDetails.vue'
import Page404 from '../views/Page404.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Quotes
    },
    {
      path: '/details/:id',
      name: 'details',
      component: QuoteDetails
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Page404
    },
  ]
})

export default router
