<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';

	const user = ref();
	onMounted(async() => {
		const data = await axios.get('/api/user');
		user.value = data.data;
	});
</script>

<template>
	<h1>{{ user?.name }}</h1>

	<p>
		<h3>{{  user?.email }}</h3>
	</p>
</template>