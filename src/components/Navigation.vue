<script setup>
	import { RouterView } from 'vue-router';
</script>

<template>
	<v-app class="main-app">
		<v-app-bar color="black">
			<div class="d-flex align-center">
				<v-app-bar-title class="ml-4 font-weight-bold">My Currency Converter</v-app-bar-title>
			</div>
			<v-spacer></v-spacer>
			<div class="mr-4">
				<router-link :to="{name: 'Home' }" class="mx-3 text-white font-weight-bold">Home</router-link> 
				<router-link :to="{name: 'Login'}" class="mx-3 text-white">Login</router-link> 
				<router-link :to="{name: 'Register'}" class="mx-3 text-white">Register</router-link>
			</div>	
		</v-app-bar>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<style>
	#app {
		height: 100vh;
	}
	.main-app {
		width: 600px;
	}
</style>