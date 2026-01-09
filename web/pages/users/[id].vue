<script setup lang="ts">
import type { User } from '~/types/user';

const route = useRoute();
const id = Number(route.params.id);

if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid user id' });
}

const config = useRuntimeConfig();

const { data: user, pending, error } = await useFetch<User>(
    `${config.public.apiBase}/api/users/${id}`
);
</script>

<template>
    <div style="padding:16px">
        <p>
            <NuxtLink to="/users">← Back</NuxtLink>
        </p>

        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error: {{ error.message }}</div>

        <div v-else-if="!user">Not Found</div>

        <div v-else>
            <h1>User Detail</h1>
            <p>ID: {{ user.id }}</p>
            <p>Name: {{ user.name }}</p>
        </div>
    </div>
</template>