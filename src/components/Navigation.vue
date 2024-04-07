<script setup>
	import { RouterView } from 'vue-router';
</script>

<template>
	<v-app>
		<v-app-bar app color="black">
			<div class="d-flex align-center">
				<v-app-bar-title class="ml-4">My Currency Converter</v-app-bar-title>
			</div>
			<v-spacer></v-spacer>
			<div class="mr-4">
				<router-link to="/" class="mx-1 text-white">Home</router-link> |
				<router-link to="/login" class="mx-1 text-white">Login</router-link> |
				<router-link to="/register" class="mx-1 text-white">Register</router-link>
			</div>
			<div>
				<router-view />
			</div>
		</v-app-bar>
	</v-app>
</template>