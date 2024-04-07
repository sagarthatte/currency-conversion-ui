<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				rememberMe: false,
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
	<v-container fluid>
		<v-row align="center" justify="center">
			<v-col cols="12">
				<v-card raised>
					<v-card-title class="text-center">
						<v-icon medium>mdi-login</v-icon>
						<span class="font-weight-bold ml-2">Login</span>
					</v-card-title>
					<v-card-text>
						<v-text-field v-model="email" label="Email" required type="email" outlined fullWidth />
						<v-text-field v-model="password" label="Password" required type="password" outlined fullWidth />
						<v-checkbox v-model="rememberMe" label="Remember Me" outlined />
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" @click="submitLogin" :disabled="!email || !password">Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>