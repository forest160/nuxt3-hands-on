<script setup lang="ts">
const { data: users, pending, error } = await useUsers();
</script>

<template>
    <div style="padding:16px">
        <h1>Users</h1>
        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error: {{ error.message }}</div>

        <ul v-else>
            <li v-for="u in users" :key="u.id">
                <NuxtLink :to="`/users/${u.id}`">
                    {{ u.id }} - {{ u.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>