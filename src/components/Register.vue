<script setup>
	import { ref } from 'vue';
	import axios from 'axios';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const form = ref({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	// const getToken = async () => {
	// 	await axios.get('/sanctum/csrf-cookie');
	// }

	const handleRegistration = async () => {
		// await getToken();
		await axios.post('/register', {
			name: form.value.name,
			email: form.value.email,
			password: form.value.password,
			password_confirmation: form.value.confirmPassword
		});
		router.push('/');
	};
	
</script>

<template>
	<v-container>	
		<v-row align="center" justify="center" class="mt-2">
			<v-col cols="12">	
				<v-card outlined elevation="3">
					<v-card-title class="text-left ml-2">
						<span class="font-weight-bold">Register</span>
					</v-card-title>
					<v-form @submit.prevent="handleRegistration">
						<v-card-text class="ml-2">
							<div class="text-left font-weight-medium">Name</div>
							<v-text-field v-model="form.name" required type="text" outlined fullWidth />
							<div class="text-left font-weight-medium">Email</div>
							<v-text-field v-model="form.email" required type="email" outlined fullWidth />
							<div class="text-left font-weight-medium">Password</div>
							<v-text-field v-model="form.password" required type="password" outlined fullWidth />
							<div class="text-left font-weight-medium">Confirm Password</div>
							<v-text-field v-model="form.confirmPassword" required type="password" outlined fullWidth />
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