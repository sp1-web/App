import {createRouter, createWebHistory} from '@ionic/vue-router';
import Promotion from '../views/Promotion'

const routes = [
    {
        path: '/',
        component: Promotion,
        meta: {
            needsAuth: true,
        },
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue'),
        meta: {
            needsAuth: false,
        },
    },
    {
        path: '/:promo_id',
        component: () => import('@/views/OfferDetails'),
        meta: {
            needsAuth: true,
        },
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.needsAuth) {
        if (!localStorage.getItem('token')) {
            return router.replace("/login");
        }
    }
    next();
});

export default router