<template>
  <Card class="w-[400px] shadow-lg bg-card">
    <CardHeader class="space-y-1">
      <CardTitle class="text-3xl font-bold text-center text-primary">
        RecordFlow
      </CardTitle>
      <CardDescription class="text-center text-muted-foreground">
        Create your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" placeholder="Enter your email" />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" placeholder="Create a password" 
                 :class="{ 'border-destructive': passwordError }" />
        </div>
        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm your password" 
                 :class="{ 'border-destructive': passwordError }" @input="clearPasswordError" />
        </div>
        <p v-if="passwordError" class="text-destructive text-sm">{{ passwordError }}</p>
        <Button type="submit" class="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Register
        </Button>
      </form>
      <div class="mt-4 text-center">
        <p class="text-sm text-muted-foreground">Or</p>
        <Button @click="handleGoogleSignIn" class="mt-2 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <img src="@/assets/google-logo.svg" alt="Google logo" class="w-5 h-5 mr-2" />
          Register with Google
        </Button>
      </div>
    </CardContent>
    <CardFooter>
      <p class="text-sm text-center w-full text-muted-foreground">
        Already have an account?
        <a href="#" class="font-medium text-primary hover:underline" @click.prevent="$emit('switch-to-login')">
          Log in
        </a>
      </p>
    </CardFooter>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerUser, signInWithGoogle } from '@/services/auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const passwordError = ref('')

const clearPasswordError = () => {
  passwordError.value = ''
}

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match"
    confirmPassword.value = ''
    return
  }
  try {
    console.log('Attempting to register user...');
    const user = await registerUser(email.value, password.value)
    console.log('User registered successfully:', user);
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration error:', error.code, error.message)
    // Handle specific error cases
    if (error.code === 'auth/email-already-in-use') {
      passwordError.value = "Email is already in use"
    } else if (error.code === 'auth/invalid-email') {
      passwordError.value = "Invalid email address"
    } else if (error.code === 'auth/weak-password') {
      passwordError.value = "Password is too weak"
    } else {
      passwordError.value = "An error occurred during registration"
    }
  }
}

const handleGoogleSignIn = async () => {
  try {
    const user = await signInWithGoogle()
    console.log('User signed in with Google:', user);
    router.push('/dashboard')
  } catch (error) {
    console.error('Google sign-in error:', error)
    passwordError.value = "An error occurred during Google sign-in"
  }
}

defineEmits(['switch-to-login'])
</script>
