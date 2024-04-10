<script setup>
	import { ref } from 'vue';
	import { useAuthStore } from '../stores/auth';

	const authStore = useAuthStore();

	const registerForm = ref({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

</script>

<template>
	<v-container>	
		<v-row align="center" justify="center" class="mt-2">
			<v-col cols="12">	
				<v-card outlined elevation="3">
					<v-card-title class="text-left ml-2">
						<span class="font-weight-bold">Register</span>
					</v-card-title>
					<v-form @submit.prevent="authStore.handleRegister(registerForm)">
						<v-card-text class="ml-2">
							<div class="text-left font-weight-medium">Name</div>
							<v-text-field v-model="registerForm.name" type="text" outlined fullWidth />
							<div v-if="authStore.errors.name" class="text-left mb-2">
								<span class="text-red">{{ authStore.errors.name[0] }}</span>
							</div>
							<div class="text-left font-weight-medium">Email</div>
							<v-text-field v-model="registerForm.email" type="email" outlined fullWidth />
							<div v-if="authStore.errors.email" class="text-left mb-2">
								<span class="text-red">{{ authStore.errors.email[0] }}</span>
							</div>
							<div class="text-left font-weight-medium">Password</div>
							<v-text-field v-model="registerForm.password" type="password" outlined fullWidth />
							<div v-if="authStore.errors.password" class="text-left mb-2">
								<span class="text-red">{{ authStore.errors.password[0] }}</span>
							</div>
							<div class="text-left font-weight-medium">Confirm Password</div>
							<v-text-field v-model="registerForm.confirmPassword" type="password" outlined fullWidth />
						</v-card-text>
						<v-card-actions>
							<router-link :to="{name: 'Login'}" tag="v-btn">
								<v-btn color="info" flat class="ml-2">
									Already Registered?
								</v-btn>
							</router-link>
							<v-spacer></v-spacer>
							<v-btn type="submit" variant="tonal" color="#5865f2" class="mr-2">Register</v-btn>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>