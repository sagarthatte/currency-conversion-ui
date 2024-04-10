<script setup>

</script>
<template>
    <h3>If you are a new user, please <router-link :to="{name: 'Register'}" tag="a"><a href="/register">Register</a></router-link></h3>
    <h3>Existing users, please <router-link :to="{name: 'Login'}" tag="a"><a href="/login">Login</a></router-link></h3>
</template>