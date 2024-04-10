import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authUser: null,
		authErrors: []
	}),
	getters: {
		user: (state) => state.authUser,
		errors: (state) => state.authErrors
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
			this.authErrors = [];
			try {
				await this.getToken();
				await axios.post('/login', {
					email: data.email,
					password: data.password
				});
				this.router.push('/');
			} catch (error) {
				if (error.response.status === 422) {
					this.authErrors = error.response.data.errors;
				}
			}
			
		},
		async handleLogout () {
			await axios.post('/logout');
			this.authUser = null;
		},
		async handleRegister (data) {
			this.authErrors = [];
			try {
				await this.getToken();
				await axios.post('/register', {
					name: data.name,
					email: data.email,
					password: data.password,
					password_confirmation: data.confirmPassword
				});
				this.router.push('/');
			} catch (error) {
				if (error.response.status === 422) {
					this.authErrors = error.response.data.errors;
				}
			}
		},
		async handleForgotPassword (data) {
			this.authErrors = [];
			try {
				this.getToken();
				await axios.post('/forgot-password', {
					email: data.email
				});

			} catch (error) {
				if (error.response.status === 422) {
					this.authErrors = error.response.data.errors;
				}
			}
		}
	}
});