<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Users, BookOpen, School } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRecordsStore } from '@/stores/useRecordsStore'

const router = useRouter()
const authStore = useAuthStore()
const recordsStore = useRecordsStore()

const user = computed(() => authStore.user)

const getUsername = () => {
  return user.value?.displayName || user.value?.email?.split('@')[0] || 'User';
};

onMounted(() => {
  recordsStore.fetchAllData()
})

const navigateToRecords = () => {
  router.push('/dashboard/records')
}
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold text-primary mb-2">Welcome Back, {{ getUsername() }}</h1>
    <p class="text-base text-muted-foreground mb-6">Here's an overview of your school's structure.</p>
    
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <!-- Year Groups Card -->
      <Card class="bg-card text-card-foreground hover:shadow-md transition-shadow">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Year Groups</CardTitle>
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <GraduationCap class="h-5 w-5 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ recordsStore.yearGroups.length }}</div>
          <p class="text-xs text-muted-foreground mt-2">
            Total year groups
          </p>
        </CardContent>
      </Card>

      <!-- Subjects Card -->
      <Card class="bg-card text-card-foreground hover:shadow-md transition-shadow">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Subjects</CardTitle>
          <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <BookOpen class="h-5 w-5 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ recordsStore.totalSubjects }}</div>
          <p class="text-xs text-muted-foreground mt-2">
            Across all year groups
          </p>
        </CardContent>
      </Card>

      <!-- Classes Card -->
      <Card class="bg-card text-card-foreground hover:shadow-md transition-shadow">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Classes</CardTitle>
          <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <School class="h-5 w-5 text-purple-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ recordsStore.totalClasses }}</div>
          <p class="text-xs text-muted-foreground mt-2">
            Total classes across all subjects
          </p> 
        </CardContent>
      </Card>

      <!-- Students Card -->
      <Card class="bg-card text-card-foreground hover:shadow-md transition-shadow">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Students</CardTitle>
          <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <Users class="h-5 w-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ recordsStore.totalStudents }}</div>
          <p class="text-xs text-muted-foreground mt-2">
            Total enrolled across all classes
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
