import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const Home = () => import('../views/home/Home')
const Cateogry = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

const routes = [
    { path: '', component: Home },
    { path: '/home', component: Home },
    { path: '/category', component: Cateogry },
    { path: '/cart', component: Cart },
    { path: '/profile', component: Profile }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router

