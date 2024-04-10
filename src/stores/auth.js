import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authUser: null,
		authErrors: [],
		authStatus: null
	}),
	getters: {
		user: (state) => state.authUser,
		errors: (state) => state.authErrors,
		status: (state) => state.authStatus
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
		async handleForgotPassword (email) {
			this.authErrors = [];
			try {
				this.getToken();
				const response = await axios.post('/forgot-password', {
					email: email
				});
				this.authStatus = response.data.status;

			} catch (error) {
				if (error.response.status === 422) {
					this.authErrors = error.response.data.errors;
				}
			}
		},
		async handleResetPassword(data) {
			this.authErrors = [];
			try {
				const response = await axios.post('/reset-password', data);
				this.router.push('/login');
			} catch (error) {
				if (error.response.status === 422) {
					this.authErrors = error.response.data.errors;
				}
			}
		}
	}
});