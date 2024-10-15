<template>
  <div class="flex items-center justify-center min-h-screen bg-background">
    <div class="relative z-10 w-full max-w-md">
      <LoginForm v-if="showLogin" @switch-to-register="showLogin = false" @login-success="handleAuthSuccess" />
      <RegisterForm v-else @switch-to-login="showLogin = true" @register-success="handleAuthSuccess" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { loginUser, registerUser, signInWithGoogle } from '@/services/auth'

const router = useRouter()
const authStore = useAuthStore()
const showLogin = ref(true)

onMounted(async () => {
  await authStore.fetchUser()
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})

const handleAuthSuccess = () => {
  router.push('/dashboard')
}

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle()
    if (authStore.needsPassword) {
      router.push('/set-password')
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Google sign-in error:', error)
  }
}
</script>
