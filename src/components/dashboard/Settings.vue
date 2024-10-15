<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h1>

    <Card class="mb-6 bg-white dark:bg-gray-800 shadow-md">
      <CardHeader>
        <CardTitle class="text-lg font-semibold text-gray-900 dark:text-white">Email</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-lg text-gray-700 dark:text-gray-300">{{ user.email }}</p>
      </CardContent>
    </Card>

    <Card class="mb-6" v-if="!hasPasswordProvider">
      <CardHeader>
        <CardTitle>Add Password Authentication</CardTitle>
        <CardDescription>Set a password for your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleAddEmailPassword" class="space-y-4">
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" placeholder="Create a password" required />
          </div>
          <div class="space-y-2">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm your password" required />
          </div>
          <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
          <Button type="submit">Add Password</Button>
        </form>
      </CardContent>
    </Card>

    <Card v-if="!hasGoogleProvider" class="bg-white dark:bg-gray-800 shadow-md">
      <CardHeader>
        <CardTitle class="text-lg font-semibold text-gray-900 dark:text-white">Link Google Account</CardTitle>
        <CardDescription class="text-gray-600 dark:text-gray-400">Add Google authentication to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button @click="handleLinkGoogle" class="bg-primary-500 hover:bg-primary-600 text-white">
          Link Google Account
        </Button>
        <p v-if="googleError" class="text-red-500 dark:text-red-400 text-sm mt-2">{{ googleError }}</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { linkEmailPassword, linkGoogleAccount } from '@/services/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const hasPasswordProvider = computed(() => 
  user.value.providerData.some(provider => provider.providerId === 'password')
);

const hasGoogleProvider = computed(() => 
  user.value.providerData.some(provider => provider.providerId === 'google.com')
);

const password = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const googleError = ref('');

const handleAddEmailPassword = async () => {
  if (password.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match";
    return;
  }
  try {
    await linkEmailPassword(user.value.email, password.value);
    authStore.fetchUser(); // Refresh user data
    password.value = '';
    confirmPassword.value = '';
    passwordError.value = '';
  } catch (err) {
    passwordError.value = err.message;
  }
};

const handleLinkGoogle = async () => {
  try {
    await linkGoogleAccount();
    authStore.fetchUser(); // Refresh user data
    googleError.value = '';
  } catch (err) {
    googleError.value = err.message;
  }
};
</script>

