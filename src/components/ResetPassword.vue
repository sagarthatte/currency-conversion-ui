<script setup>
	import { ref } from 'vue';
	import { useAuthStore } from '../stores/auth';
	import { useRoute } from 'vue-router';

	const route = useRoute();
	const authStore = useAuthStore();

	const resetPasswordForm = ref({
		email: route.query.email,
		token: route.params.token,
		password: '',
		password_confirmation: ''
	});
</script>

<template>
	<v-container>	
		<v-row align="center" justify="center" class="mt-2">
			<v-col cols="12">	
				<v-card outlined elevation="3">
					<v-card-title class="text-left ml-2">
						<span class="font-weight-bold">Reset Password</span>
					</v-card-title>
					<v-form @submit.prevent="authStore.handleResetPassword(resetPasswordForm)">
						<v-card-text class="ml-2">
							<div v-if="authStore.status" class="text-left mb-2 font-weight-medium text-green">
								{{ authStore.status }}
							</div>
							<div class="text-left font-weight-medium mt-2">Email</div>
							<v-text-field readonly v-model="resetPasswordForm.email" type="email" outlined fullWidth />
							<div v-if="authStore.errors.email" class="text-left mb-2">
								<span class="text-red">{{ authStore.errors.email[0] }}</span>
							</div>
							<div class="text-left font-weight-medium mt-2">Password</div>
							<v-text-field v-model="resetPasswordForm.password" type="password" outlined fullWidth />
							<div v-if="authStore.errors.password" class="text-left mb-2">
								<span class="text-red">{{ authStore.errors.password[0] }}</span>
							</div>
							<div class="text-left font-weight-medium mt-2">Confirm Password</div>
								<v-text-field v-model="resetPasswordForm.password_confirmation" type="password" outlined fullWidth />
								<!-- <div v-if="authStore.errors.email" class="text-left mb-2">
									<span class="text-red">{{ authStore.errors.email[0] }}</span>
								</div> -->
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn type="submit" variant="tonal" color="#5865f2" class="mr-2">
								Reset Password
							</v-btn>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>