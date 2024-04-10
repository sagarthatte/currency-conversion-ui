<script setup>
	import { ref } from 'vue';
	import { useAuthStore } from '../stores/auth';

	const authStore = useAuthStore();

	const loginForm = ref({
		email: '',
		password: ''
	});
	
</script>

<template>
	<v-container>	
		<v-row align="center" justify="center" class="mt-2">
			<v-col cols="12">	
				<v-card outlined elevation="3">
					<v-card-title class="text-left ml-2">
						<span class="font-weight-bold">Log In</span>
					</v-card-title>
					<v-form @submit.prevent="authStore.handleLogin(loginForm)">
						<v-card-text class="ml-2">
							<div class="text-left font-weight-medium">Email</div>
							<v-text-field v-model="loginForm.email" type="email" outlined fullWidth />
							<div v-if="authStore.errors.email" class="text-left mb-2">
								<span class="text-red">{{ authStore.errors.email[0] }}</span>
							</div>
							<div class="font-weight-medium text-left">Password</div>
							<v-text-field v-model="loginForm.password" type="password" outlined fullWidth />
							<div v-if="authStore.errors.password" class="text-left mb-2">
								<span class="text-red">{{ authStore.errors.password[0] }}</span>
							</div>
						</v-card-text>
						<v-card-actions>
							<router-link :to="{name: 'ForgotPassword'}" tag="v-btn">
								<v-btn color="info" flat class="ml-2">
									Forgot password?
								</v-btn>
							</router-link>
							<v-spacer></v-spacer>
							<v-btn variant="tonal" color="#5865f2" type="submit" class="mr-2">
								<!-- :disabled="!loginForm.email || !loginForm.password" -->
								Log In
							</v-btn>
						</v-card-actions>
						<v-card-actions>
							<div class="font-weight-medium ml-4" color="info">
								Not a member yet? <router-link :to="{name: 'Register'}" tag="a"><a href="/register">Sign Up</a></router-link>
							</div>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>