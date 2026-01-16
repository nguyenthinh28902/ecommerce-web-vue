import { defineStore } from 'pinia'

interface CustomerDto {
  id: number;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  email?: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as CustomerDto | null,
    isLoggedIn: false,
  }),
  actions: {
    setUser(data: CustomerDto) {
      this.user = data;
      this.isLoggedIn = true;
    },
    clearAuth() {
      this.user = null;
      this.isLoggedIn = false;
      useCookie('is_logged_in').value = null;
      useCookie('auth_expires').value = null;
    },
    async logout() {
      const config = useRuntimeConfig();
      
      try {
        // 1. Gọi API xóa session phía Server (nếu cần)
        await $fetch(`${config.public.apiGatewayBaseUrl}/dang-xuat`, {
            mode: 'no-cors' // Để tránh lỗi CORS khi redirect
        });
      } catch (e) {
        console.log("Xóa session server...");
      }

      // 2. Xóa dữ liệu trong Pinia
      this.user = null;
      this.isLoggedIn = false;

      // 3. Xóa Cookie mà Google/Backend đã set cho trình duyệt
      const isLoggedIn = useCookie('is_logged_in');
      isLoggedIn.value = null;

      // 4. Chuyển về trang login
      await navigateTo('/');
    }
  }

})