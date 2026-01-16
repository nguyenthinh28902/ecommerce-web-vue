<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-blue-600">MY-STORE</NuxtLink>
          </div>

          <div class="flex items-center gap-4">
            <div v-if="authStore.isLoggedIn" class="flex items-center gap-3">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user?.displayName || authStore.user?.username }}</p>
                <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
              </div>
              <img :src="authStore.user?.avatarUrl || 'https://ui-avatars.com/api/?name=' + authStore.user?.username" 
                   class="h-8 w-8 rounded-full border">
              <button @click="handleLogout" class="text-sm text-red-600 hover:underline">Thoát</button>
            </div>

            <template v-if="authStore.isLoggedIn">
        <div class="flex items-center gap-2">
          <img :src="authStore.user?.avatarUrl" class="w-8 h-8 rounded-full border" />
          <span class="text-sm font-medium">{{ authStore.user?.displayName }}</span>
        </div>
        
        <button 
          @click="confirmLogout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
        >
          Đăng xuất
        </button>
      </template>

            <NuxtLink v-else to="/login" 
                      class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Đăng nhập
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.clearAuth();
  navigateTo('/login');
};
</script>