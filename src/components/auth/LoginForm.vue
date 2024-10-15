<template>
  <Card class="w-[400px] shadow-lg bg-card">
    <CardHeader class="space-y-1">
      <CardTitle class="text-3xl font-bold text-center text-primary">
        RecordFlow
      </CardTitle>
      <CardDescription class="text-center text-muted-foreground">
        Access your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="social">
            <div class="flex items-center p-1">
                <User class="mr-2 h-4 w-4" />
                Social Login
            </div>
          </TabsTrigger>
          <TabsTrigger value="credentials">
            <div class="flex items-center p-1">
                <Key class="mr-2 h-4 w-4" />
                Email & Password
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="social">
          <Button @click="handleGoogleSignIn" class="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 mb-4">
            <img src="@/assets/google-logo.svg" alt="Google logo" class="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>
          <!-- Add other social login options here if needed -->
        </TabsContent>
        <TabsContent value="credentials">
          <form @submit.prevent="handleCredentialsLogin" class="space-y-4">
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" v-model="email" type="email" placeholder="Enter your email" @input="clearCredentialsError" />
            </div>
            <div class="space-y-2">
              <Label for="password">Password</Label>
              <Input id="password" v-model="password" type="password" placeholder="Enter your password" @input="clearCredentialsError" />
            </div>
            <Button type="submit" class="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Log In
            </Button>
          </form>
          <p v-if="credentialsError" class="mt-4 text-red-500 text-sm text-center">{{ credentialsError }}</p>
        </TabsContent>
      </Tabs>
    </CardContent>
    <CardFooter>
      <p class="text-sm text-center w-full text-gray-600">
        Don't have an account?
        <a href="#" class="font-medium text-green-600 hover:underline" @click.prevent="$emit('switch-to-register')">
          Register
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Key } from 'lucide-vue-next'
import { loginUser, signInWithGoogle } from '@/services/auth'

const router = useRouter()

const activeTab = ref('social')
const email = ref('')
const password = ref('')
const credentialsError = ref('')

const clearCredentialsError = () => {
  credentialsError.value = ''
}

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle()
    console.log('User signed in successfully with Google')
    router.push('/dashboard')
  } catch (error) {
    console.error('Google sign-in error:', error)
    // We don't set an error message for social login
  }
}

const handleCredentialsLogin = async () => {
  try {
    await loginUser(email.value, password.value)
    console.log('User logged in successfully')
    router.push('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
    credentialsError.value = 'Invalid email or password. Please try again.'
  }
}

defineEmits(['switch-to-register'])
</script>
