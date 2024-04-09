<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';
	import ApplicationLogo from './ApplicationLogo.vue';

	const user = ref();
	onMounted(async() => {
		// Get token
		await getToken();
		// Then get logged in user data
		const data = await axios.get('/api/user');
		user.value = data.data;
	});
	const getToken = async() => {
		await axios.get('/sanctum/csrf-cookie');
	}
</script>

<template>
	<ApplicationLogo class="block h-9 w-auto" />
	<h1>{{ user?.name }}</h1>

	<p>
		<h3>{{  user?.email }}</h3>
	</p>
</template>