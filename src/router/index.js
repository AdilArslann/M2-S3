import { createRouter, createWebHistory } from 'vue-router'
import '../App.vue'
import DayHabits from '../components/DayHabits.vue'

const routes = [
  { path: '/', redirect: '/day/:date' },
  { path: '/day/:date', component: DayHabits }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
