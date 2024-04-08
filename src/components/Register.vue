<script>
	export default {
		data() {
			return {
                name: '',
				email: '',
				password: '',
                confirmPassword: ''
			};
		},
		methods: {
			async registerUser() {
				console.log('Register');
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
						<span class="font-weight-bold">Register</span>
					</v-card-title>
					<v-card-text class="ml-2">
                        <div class="text-left font-weight-medium">Name</div>
                        <v-text-field v-model="name" required type="text" outlined fullWidth />
                        <div class="text-left font-weight-medium">Email</div>
						<v-text-field v-model="email" required type="email" outlined fullWidth />
                        <div class="text-left font-weight-medium">Password</div>
						<v-text-field v-model="password" required type="password" outlined fullWidth />
                        <div class="text-left font-weight-medium">Confirm Password</div>
                        <v-text-field v-model="confirmPassword" required type="password" outlined fullWidth />
					</v-card-text>
					<v-card-actions>
                        <router-link :to="{name: 'Login'}" tag="v-btn">
							<v-btn color="info" flat class="ml-2">
								Already Registered?
							</v-btn>
						</router-link>
                        <v-spacer></v-spacer>
						<v-btn variant="tonal" color="#5865f2" class="mr-2" @click="registerUser" :disabled="!(email || password || confirmPassword) && !(password === confirmPassword)">Register</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>