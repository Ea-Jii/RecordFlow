<template>
  <header class="bg-background border-b border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <h1 class="text-2xl font-bold text-primary">RecordFlow</h1>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out"
            :class="[$route.path === item.path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground']"
          >
            <component :is="item.icon" class="w-4 h-4 mr-2" />
            {{ item.name }}
          </router-link>
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-6">
          <!-- Dark mode toggle -->
          <button 
            @click="toggleTheme" 
            class="w-14 h-7 rounded-full relative transition-colors duration-300 ease-in-out focus:outline-none"
            :class="isDarkMode ? 'bg-primary' : 'bg-gray-300'"
          >
            <div 
              class="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out"
              :class="isDarkMode ? 'translate-x-7' : ''"
            >
              <Sun v-if="!isDarkMode" class="h-4 w-4 text-yellow-500" />
              <Moon v-else class="h-4 w-4 text-blue-500" />
            </div>
          </button>

          <!-- User Menu -->
          <DropdownMenu>
            <DropdownMenuTrigger class="focus:outline-none group">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <Avatar class="h-10 w-10 rounded-full overflow-hidden bg-secondary">
                    <AvatarImage :src="user.photoURL || ''" class="object-cover" />
                    <AvatarFallback class="bg-primary text-primary-foreground text-sm font-medium">
                      {{ getUserInitials() }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                </div>
                <div class="flex flex-col items-start">
                  <span class="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">{{ getUsername() }}</span>
                  <span class="text-xs text-muted-foreground">View profile</span>
                </div>
                <ChevronDown class="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56 mt-2 bg-popover text-popover-foreground">
              <DropdownMenuLabel class="font-normal">
                <div class="font-medium">{{ getUsername() }}</div>
                <div class="text-xs text-muted-foreground mt-0.5">{{ user.email }}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator class="bg-border" />
              <DropdownMenuItem @click="navigateTo('/dashboard/settings')" class="cursor-pointer group">
                <Settings class="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                Account settings
              </DropdownMenuItem>
              <DropdownMenuItem @click="handleLogout" class="cursor-pointer group">
                <LogOut class="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
            <span class="sr-only">Open main menu</span>
            <Menu v-if="!isMenuOpen" class="block h-6 w-6" aria-hidden="true" />
            <X v-else class="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div :class="[isMenuOpen ? 'block' : 'hidden', 'md:hidden']">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          :class="[$route.path === item.path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground']"
          @click="isMenuOpen = false"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTheme } from '@/composables/useTheme';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Home, FileText, Settings, LogOut, Sun, Moon, ChevronDown, Menu, X } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const { mode, toggleTheme } = useTheme();

const user = computed(() => authStore.user);
const isMenuOpen = ref(false);

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Records', path: '/dashboard/records', icon: FileText },
];

const isDarkMode = computed(() => mode.value === 'dark');

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/auth');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const navigateTo = (path: string) => {
  router.push(path);
};

const getUsername = () => {
  return user.value.displayName || user.value.email.split('@')[0];
};

const getUserInitials = () => {
  if (user.value.displayName) {
    return user.value.displayName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  }
  return user.value.email[0].toUpperCase();
};
</script>
