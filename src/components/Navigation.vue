<script setup>
	import { RouterView } from 'vue-router';
	import { useAuthStore } from '../stores/auth';

	const authStore = useAuthStore();
</script>

<template>
	<v-app class="main-app">
		<v-app-bar color="#97b38f">
			<div class="d-flex align-center">
				<v-app-bar-title class="ml-4 font-weight-bold">My Currency Converter</v-app-bar-title>
			</div>
			<v-spacer></v-spacer>
			<div class="mr-4">
				<template v-if="!authStore.user">
					<router-link :to="{name: 'Home' }" class="mx-3 font-weight-bold">Home</router-link>
					<router-link :to="{name: 'Login'}" class="mx-3 font-weight-bold">Login</router-link>
					<router-link :to="{name: 'Register'}" class="mx-3 font-weight-bold">Register</router-link>
				</template>
				<template v-else>
					<v-label class="mt-5 font-weight-medium">Hello, {{ authStore.user.name }}</v-label>
					<v-btn variant="tonal" color="black" @click="authStore.handleLogout" class="mx-3 text-none font-weight-bold">Logout</v-btn>
				</template>
			</div>	
		</v-app-bar>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<style>
	#app {
		height: 200vh;
	}
	.main-app {
		width: 800px;
		height: 800px;
	}
</style>