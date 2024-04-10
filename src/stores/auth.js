import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null
    }),
    getters: {
        user: (state) => state.authUser
    },
    actions: {
        async getToken () {
            await axios.get('/sanctum/csrf-cookie');
        },
        async getUser () {
            this.getToken();
            const response = await axios.get('/api/user');
            this.authUser = response.data;
        },
        async handleLogin (data) {
            await this.getToken();
            await axios.post('/login', {
                email: data.email,
                password: data.password
            });
            this.router.push('/');
        },
        async handleLogout () {
            await axios.post('/logout');
            this.authUser = null;
        },
        async handleRegister (data) {
            await this.getToken();
            await axios.post('/register', {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword
            });
            this.router.push('/');
        }
    }
});