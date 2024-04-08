<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				//rememberMe: false,
			};
		},
		methods: {
			async submitLogin() {
				console.log('Login');
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
						<span class="font-weight-bold">Log In</span>
					</v-card-title>
					<v-card-text class="ml-2">
						<div class="text-left font-weight-medium">Email</div>
						<v-text-field v-model="email" required type="email" outlined fullWidth />
						<div class="font-weight-medium text-left">Password</div>
						<v-text-field v-model="password" required type="password" outlined fullWidth />
						<!-- <v-checkbox v-model="rememberMe" label="Remember Me" outlined class="ma-0" /> -->
					</v-card-text>
					<v-card-actions>
						<!-- <v-btn block variant="elevated" color="primary" @click="submitLogin" :disabled="!email || !password">Login</v-btn> -->	
						<router-link :to="{name: 'ResetPassword'}" tag="v-btn">
							<v-btn color="info" flat class="ml-2">
								Forgot password?
							</v-btn>
						</router-link>
						<v-spacer></v-spacer>
						<v-btn variant="tonal" color="#5865f2" @click="submitLogin" class="mr-2" :disabled="!email || !password">
							Log In
						</v-btn>
					</v-card-actions>
					<v-card-actions>
						<div class="font-weight-medium ml-4" color="info">
							Not a member yet? <router-link :to="{name: 'Register'}" tag="a"><a href="/register">Sign Up</a></router-link>
						</div>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>