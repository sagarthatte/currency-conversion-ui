<script setup>
	import { RouterView } from 'vue-router';
</script>

<template>
	<v-app>
		<v-app-bar color="black">
			<div class="d-flex align-center">
				<v-app-bar-title class="ml-4">My Currency Converter</v-app-bar-title>
			</div>
			<v-spacer></v-spacer>
			<div class="mr-4">
				<router-link :to="{name: 'Home' }" class="mx-1 text-white">Home</router-link> |
				<router-link :to="{name: 'Login'}" class="mx-1 text-white">Login</router-link> |
				<router-link :to="{name: 'Register'}" class="mx-1 text-white">Register</router-link>
			</div>	
		</v-app-bar>
		<v-main>
			<v-container fluid>
				<v-row>
					<router-view />
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<style>
	#app {
		height: 100vh;
		
	}
</style>