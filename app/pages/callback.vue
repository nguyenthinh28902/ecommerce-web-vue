<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <p>Đang xác thực và tải thông tin người dùng...</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import type { Result } from '@/models/result'
import type { CustomerDto } from '@/models/customer'
import { ApiRoutes } from '@/constants/apiList'
const authStore = useAuthStore();
const config = useRuntimeConfig();
const isLoggedInCookie = useCookie<boolean>('is_logged_in');

onMounted(async () => {
  if (isLoggedInCookie.value === true) {
    try {
      const res = await $fetch<Result<CustomerDto>>(
        `${config.public.apiGatewayBaseUrl}${ApiRoutes.Auth.GetCurrentCustomerInfo}`,
        {
          method: 'GET',
          credentials: 'include'
        }
      )

      if (!res.isSuccess || !res.data) {
        authStore.clearAuth()
        await navigateTo('/login?error=unauthorized')
        return
      }

      // ✅ BE trả về Result<CustomerDto>
      authStore.setUser(res.data)
      await navigateTo('/')
    } catch (error) {
      authStore.clearAuth()
      await navigateTo('/login?error=fetch_user_failed')
    }
  } else {
    await navigateTo('/login')
  }
})
</script>