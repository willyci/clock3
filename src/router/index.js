import { createRouter, createWebHistory } from '@ionic/vue-router';

import MemoriesPage from '../pages/MemoriesPage.vue';
import ClassListPage from '../pages/ClassListPage.vue';
//import StudentListPage from '../pages/StudentListPage.vue';
//import SubmitTimePage from '../pages/SubmitTimePage.vue';

const routes = [{
        path: '/',
        redirect: '/classList'
    },
    {
        path: '/memories',
        component: MemoriesPage
    },
    {
        path: '/memories/:id',
        component: () =>
            import ('../pages/MemoryDetailsPage.vue')
    },
    {
        path: '/memories/add',
        component: () =>
            import ('../pages/AddMemoryPage.vue')
    },
    {
        path: '/classList',
        component: ClassListPage
    },
    {
        path: '/submitTime/:id',
        component: () =>
            import ('../pages/SubmitTimePage.vue'),
        props: true,
        name: 'submitTime'
    },
    {
        path: '/studentList/:id',
        component: () =>
            import ('../pages/StudentListPage.vue'),
        props: true,
        name: 'studentList'
    },
    {
        path: '/login',
        component: () =>
            import ('../pages/loginPage.vue'),
        props: true,
        name: 'login'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router