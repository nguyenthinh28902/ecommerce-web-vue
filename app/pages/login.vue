<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Đăng nhập hệ thống</h1>
    <button @click="loginWithGoogle" class="bg-blue-600 text-white px-6 py-2 rounded">
      Đăng nhập bằng Google
    </button>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const loginWithGoogle = () => {
  const returnUrl = window.location.origin + '/callback?status=success';
  const targetUrl = `${config.public.apiGatewayBaseUrl}/dang-nhap?returnUrl=${encodeURIComponent(returnUrl)}`;
  window.location.href = targetUrl;
};
</script>