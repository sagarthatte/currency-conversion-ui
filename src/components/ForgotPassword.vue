<script setup>
	import { ref } from 'vue';
	import { useAuthStore } from '../stores/auth';

	const authStore = useAuthStore();

	const email = ref('');
</script>

<template>
	<v-container>	
		<v-row align="center" justify="center" class="mt-2">
			<v-col cols="12">	
				<v-card outlined elevation="3">
					<v-card-title class="text-left ml-2">
						<span class="font-weight-bold">Forgot Password</span>
					</v-card-title>
					<v-form @submit.prevent="authStore.handleForgotPassword(email)">
						<v-card-text class="ml-2">
							<div v-if="authStore.status" class="text-left mb-2 font-weight-medium text-green">
								{{  authStore.status }}
							</div>
							<div class="text-left">
								Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
							</div>
							<div class="text-left font-weight-medium mt-2">Email</div>
							<v-text-field v-model="email" type="email" outlined fullWidth />
							<div v-if="authStore.errors.email" class="text-left mb-2">
								<span class="text-red">{{ authStore.errors.email[0] }}</span>
							</div>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn type="submit" variant="tonal" color="#5865f2" class="mr-2">
								Email Password Reset Link
							</v-btn>
						</v-card-actions>
					</v-form>
					
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>