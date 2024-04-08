<script>
	export default {
		data() {
			return {
				email: ''
			};
		},
		methods: {
			async requestPasswordResetEmail() {
				console.log('Password Reset requested');
				// try {
				// 	const response = await axios.post(`${process.env.VUE_APP_API_URL}/login`, {
				// 		email: this.email,
				// 		password: this.password,
				// 		remember: this.rememberMe
				// 	});

				// 	// Handle successful login based on response data (e.g., store token, redirect)
				// 	console.log('Login successful:', response.data);
				// } catch (error) {
				// 	console.error('Login error:', error);
				// 	// Handle login errors (e.g., display error message)
				// }
			},
		},
	};
</script>

<template>
	<v-container>	
		<v-row align="center" justify="center" class="mt-2">
			<v-col cols="12">	
				<v-card outlined elevation="3">
					<v-card-title class="text-left ml-2">
						<span class="font-weight-bold">Reset Password</span>
					</v-card-title>
					<v-card-text class="ml-2">
                        <div class="text-left">
                            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                        </div>
						<div class="text-left font-weight-medium mt-2">Email</div>
						<v-text-field v-model="email" required type="email" outlined fullWidth />
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn variant="tonal" color="#5865f2" @click="requestPasswordResetEmail" class="mr-2" :disabled="!email">
							Email Password Reset Link
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>