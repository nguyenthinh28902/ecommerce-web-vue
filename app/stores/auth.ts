import { defineStore } from 'pinia'
import type { Result } from '@/models/result'
import type { CustomerDto } from '@/models/customer'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as CustomerDto | null,
    isLoggedIn: false
  }),

  actions: {
    setUser(user: CustomerDto) {
      this.user = user
      this.isLoggedIn = true
    },

    clearAuth() {
      this.user = null
      this.isLoggedIn = false
      useCookie('is_logged_in').value = null
      useCookie('auth_expires').value = null
    },

    async login() {
      const config = useRuntimeConfig()

      const res = await $fetch<Result<CustomerDto>>(
        `${config.public.apiGatewayBaseUrl}/dang-nhap`,
        {
          method: 'POST',
          credentials: 'include'
        }
      )

      if (!res.isSuccess || !res.data) {
        this.clearAuth()
        throw new Error(res.error ?? 'Login failed')
      }

      // ✅ BE trả về Result<CustomerDto>
      this.setUser(res.data)

      // optional: sync cookie state
      useCookie('is_logged_in').value = '1'
    },

    async logout() {
      const config = useRuntimeConfig()

      try {
        await $fetch(`${config.public.apiGatewayBaseUrl}/dang-xuat`, {
          method: 'POST',
          credentials: 'include'
        })
      } catch {}

      this.clearAuth()
      await navigateTo('/')
    }
  }
})
