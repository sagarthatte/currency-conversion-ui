<script setup>
	import { ref, onMounted } from 'vue';
	import { useAuthStore } from '../stores/auth';
	import ApplicationLogo from './ApplicationLogo.vue';

	const user = ref();
	const authStore = useAuthStore();

	onMounted(async() => {
		await authStore.getUser();
	});

</script>

<template>
	<ApplicationLogo class="block h-9 w-auto" />
	<div v-if="authStore.user">
		<h3>Hello {{ authStore.user.name }} ({{  authStore.user.email }})</h3>
	</div>
	<div v-else>
		<h3>If you are a new user, please <router-link :to="{name: 'Register'}" tag="a"><a href="/register">Register</a></router-link></h3>
		<h3>Existing users, please <router-link :to="{name: 'Login'}" tag="a"><a href="/login">Login</a></router-link></h3>
	</div>
</template>