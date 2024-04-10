<script setup>
	import { onMounted } from 'vue';
	import { useAuthStore } from '../stores/auth';
	import ApplicationLogo from './ApplicationLogo.vue';
	import GuestLayout from '../layouts/GuestLayout.vue';
	import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';

	const authStore = useAuthStore();

	onMounted(async() => {
		const user = await authStore.getUser();
	});

</script>

<template>
	<div v-if="authStore.user">
		<AuthenticatedLayout />
	</div>
	<div v-else>
		<ApplicationLogo class="block h-9 w-auto mb-9" />
		<GuestLayout />
	</div>
</template>