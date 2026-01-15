<script setup lang="ts">
import type { User } from '~/types/user';

const config = useRuntimeConfig();
const name = ref('');
const message = ref<string | null>(null);
const submitting = ref(false);

const { data: users, pending, error, refresh } = await useUsers();

const createUser = async () => {
    message.value = null;
    const v = name.value.trim();
    if (!v) {
        message.value = '名前を入力してください';
        return;
    }

    submitting.value = true;
    try {
        await $fetch<User>(`/api/users`, {
            method: 'POST',
            body: { name: v },
        });
        name.value = '';
        message.value = '追加しました';
        await refresh(); // 一覧更新
    } catch (e: any) {
        message.value = e?.data?.message ?? '追加に失敗しました';
    } finally {
        submitting.value = false;
    }
};
</script>

<template>
    <div style="margin: 12px 0; display:flex; gap:8px; align-items:center;">
        <input v-model="name" placeholder="Name" />
        <button :disabled="submitting" @click="createUser">
            {{ submitting ? 'Adding...' : 'Add' }}
        </button>
    </div>

    <ul data-testid="user-list">
        <li v-for="u in users" :key="u.id">{{ u.name }}</li>
    </ul>

    <p v-if="message">{{ message }}</p>
</template>