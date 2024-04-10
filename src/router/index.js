import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import ForgotPassword from '../components/ForgotPassword.vue'

const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path:'/login',
                name: 'Login',
                component: Login
            },
            {
                path:'/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/forgotpassword',
                name: 'ForgotPassword',
                component: ForgotPassword
            }
        ]
    }
);

export default router;