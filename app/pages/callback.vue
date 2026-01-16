<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <p>Đang xác thực và tải thông tin người dùng...</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const config = useRuntimeConfig();
const isLoggedInCookie = useCookie<boolean>('is_logged_in');

onMounted(async () => {
    debugger
  if (isLoggedInCookie.value === true) {
    try {
      const data = await $fetch(`${config.public.apiGatewayBaseUrl}/api/khach-hang/thong-tin-chi-tiet`, {
        method: 'GET',
        credentials: 'include'
      });

      if (data) {
        authStore.setUser(data as any);
        await navigateTo('/');
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin user:", error);
      await navigateTo('/login?error=fetch_user_failed');
    }
  } else {
    await navigateTo('/login');
  }
});
</script>