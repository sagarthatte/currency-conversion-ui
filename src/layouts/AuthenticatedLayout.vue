<script setup>
	import { onMounted } from 'vue';
	import { useAuthStore } from '../stores/auth';

	const authStore = useAuthStore();
	onMounted(async() => {
		await authStore.getUser();
	});

</script>
<template>
	<v-container>
		<h3>Hello {{ authStore.user.name }} ({{ authStore.user.email }})</h3>
	</v-container>
</template>