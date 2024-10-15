<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">User Settings</h1>
    
    <!-- Other settings components -->

    <div v-if="!hasPasswordProvider">
      <h2 class="text-xl font-semibold mb-2">Add Password Authentication</h2>
      <SetPassword 
        :email="user.email" 
        @email-password-added="handleEmailPasswordAdded" 
      />
    </div>

    <div v-if="!hasGoogleProvider" class="mt-4">
      <h2 class="text-xl font-semibold mb-2">Link Google Account</h2>
      <LinkGoogleAccount 
        @google-account-linked="handleGoogleAccountLinked" 
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import SetPassword from '@/components/dashboard/SetPassword.vue';
import LinkGoogleAccount from '@/components/dashboard/LinkGoogleAccount.vue';

const authStore = useAuthStore();
const { user } = authStore;

const hasPasswordProvider = computed(() => 
  user.value.providerData.some(provider => provider.providerId === 'password')
);

const hasGoogleProvider = computed(() => 
  user.value.providerData.some(provider => provider.providerId === 'google.com')
);

const handleEmailPasswordAdded = () => {
  // Refresh user data or show a success message
  console.log('Password authentication added successfully');
};

const handleGoogleAccountLinked = () => {
  // Refresh user data or show a success message
  console.log('Google account linked successfully');
};
</script>
