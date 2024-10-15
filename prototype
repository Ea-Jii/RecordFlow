<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, GraduationCap, BarChart, Settings, Search, Plus, ChevronDown, ArrowLeft, UserPlus, ChevronUp, ChevronRight, Users, Book, Pencil, Trash2, MoreVertical, FileText, Sparkles, InfoIcon } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from "@/components/ui/toast"
import { ScrollArea } from "@/components/ui/scroll-area"

const yearGroups = ref([])
const selectedYearGroup = ref(null)
const selectedSubject = ref(null)
const selectedClass = ref(null)
const newYearGroupName = ref("")
const newSubjectName = ref("")
const newClassName = ref("")
const showRecords = ref(false)
const showAddStudentForm = ref(false)
const newStudent = ref({ name: '', id: '', grade: '' })
const sortOrder = ref('asc')
const currentPage = ref(1)
const editingStudent = ref(null)
const showAddYearGroupDialog = ref(false)
const showAddSubjectDialog = ref(false)
const showAddClassDialog = ref(false)

const studentsPerPage = 5

const currentView = computed(() => {
  if (showRecords.value) return 'records'
  if (selectedClass.value) return 'class'
  if (selectedSubject.value) return 'subject'
  if (selectedYearGroup.value) return 'yearGroup'
  return 'overview'
})

const getTotalStudents = (yearGroup) => {
  return yearGroup.subjects.reduce((total, subject) => {
    return total + subject.classes.reduce((classTotal, classItem) => {
      return classTotal + classItem.students.length
    }, 0)
  }, 0)
}

const { toast } = useToast()

const showSuccessToast = (message: string) => {
  toast({
    title: "Success",
    description: message,
    class: "bg-green-500",
  })
}

const showErrorToast = (message: string) => {
  toast({
    title: "Error",
    description: message,
    class: "bg-red-500",
  })
}

const addYearGroup = () => {
  if (newYearGroupName.value.trim()) {
    yearGroups.value.push({ name: newYearGroupName.value, subjects: [] })
    newYearGroupName.value = ""
    showAddYearGroupDialog.value = false
    showSuccessToast("Year group added successfully")
  } else {
    showErrorToast("Year group name cannot be empty")
  }
}

const deleteYearGroup = (yearGroupName) => {
  yearGroups.value = yearGroups.value.filter(yg => yg.name !== yearGroupName)
  if (selectedYearGroup.value === yearGroupName) {
    selectedYearGroup.value = null
    selectedSubject.value = null
    selectedClass.value = null
    showRecords.value = false
  }
}

const addSubject = () => {
  if (newSubjectName.value.trim() && selectedYearGroup.value) {
    const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
    if (yearGroup) {
      yearGroup.subjects.push({ name: newSubjectName.value, classes: [] })
      newSubjectName.value = ""
      showAddSubjectDialog.value = false
    }
  }
}

const deleteSubject = (subjectName) => {
  const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
  if (yearGroup) {
    yearGroup.subjects = yearGroup.subjects.filter(s => s.name !== subjectName)
    if (selectedSubject.value === subjectName) {
      selectedSubject.value = null
      selectedClass.value = null
      showRecords.value = false
    }
  }
}

const addClass = () => {
  if (newClassName.value.trim() && selectedYearGroup.value && selectedSubject.value) {
    const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
    if (yearGroup) {
      const subject = yearGroup.subjects.find(s => s.name === selectedSubject.value)
      if (subject) {
        subject.classes.push({ name: newClassName.value, students: [] })
        newClassName.value = ""
        showAddClassDialog.value = false
      }
    }
  }
}

const deleteClass = (className) => {
  const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
  if (yearGroup) {
    const subject = yearGroup.subjects.find(s => s.name === selectedSubject.value)
    if (subject) {
      subject.classes = subject.classes.filter(c => c.name !== className)
      if (selectedClass.value === className) {
        selectedClass.value = null
        showRecords.value = false
      }
    }
  }
}

const updateStudent = (updatedStudent) => {
  const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
  if (yearGroup) {
    const subject = yearGroup.subjects.find(s => s.name === selectedSubject.value)
    if (subject) {
      const classObj = subject.classes.find(c => c.name === selectedClass.value)
      if (classObj) {
        const studentIndex = classObj.students.findIndex(s => s.id === updatedStudent.id)
        if (studentIndex !== -1) {
          classObj.students[studentIndex] = updatedStudent
        }
      }
    }
  }
  editingStudent.value = null
}

const addStudent = () => {
  if (newStudent.value.name && newStudent.value.id && newStudent.value.grade) {
    const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
    if (yearGroup) {
      const subject = yearGroup.subjects.find(s => s.name === selectedSubject.value)
      if (subject) {
        const classObj = subject.classes.find(c => c.name === selectedClass.value)
        if (classObj) {
          classObj.students.push({ 
            ...newStudent.value,
            status: 'Active',
            startDate: new Date().toLocaleDateString('en-US')
          })
          newStudent.value = { name: '', id: '', grade: '' }
          showAddStudentForm.value = false
          showSuccessToast("Student added successfully")
        }
      }
    }
  } else {
    showErrorToast("Please fill in all student details")
  }
}

const deleteStudent = (studentId: string) => {
  const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
  if (yearGroup) {
    const subject = yearGroup.subjects.find(s => s.name === selectedSubject.value)
    if (subject) {
      const classObj = subject.classes.find(c => c.name === selectedClass.value)
      if (classObj) {
        classObj.students = classObj.students.filter(s => s.id !== studentId)
        showSuccessToast("Student deleted successfully")
      }
    }
  }
}

const currentSubjectClasses = computed(() => {
  const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
  const subject = yearGroup?.subjects.find(s => s.name === selectedSubject.value)
  return subject?.classes || []
})

const currentClassStudents = computed(() => {
  const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
  const subject = yearGroup?.subjects.find(s => s.name === selectedSubject.value)
  const classItem = subject?.classes.find(c => c.name === selectedClass.value)
  return classItem?.students || []
})

const searchQuery = ref('')

const filteredStudents = computed(() => {
  return currentClassStudents.value
    .filter(student => 
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder.value === 'asc') {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })
})

const totalPages = computed(() => Math.ceil(filteredStudents.value.length / studentsPerPage))

const currentStudents = computed(() => 
  filteredStudents.value.slice(
    (currentPage.value - 1) * studentsPerPage,
    currentPage.value * studentsPerPage
  )
)

onMounted(() => {
  currentPage.value = 1
})

const addNewClass = () => {
  showAddClassDialog.value = true
}

const { isDark } = useTheme()
const authStore = useAuthStore()

// Add this computed property to get the current subject name
const currentSubjectName = computed(() => {
  const yearGroup = yearGroups.value.find(yg => yg.name === selectedYearGroup.value)
  return yearGroup?.subjects.find(s => s.name === selectedSubject.value)?.name || ''
})
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden bg-background text-foreground">
    <!-- Reverted Title and Improved Breadcrumb -->
    <div class="flex-shrink-0 p-6 border-b border-border">
      <div class="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" @click="selectedYearGroup = null; selectedSubject = null; selectedClass = null; showRecords = false;" :class="{ 'text-primary font-semibold': currentView === 'overview' }">Year Groups</BreadcrumbLink>
            </BreadcrumbItem>
            <template v-if="selectedYearGroup">
              <BreadcrumbSeparator>
                <ChevronRight class="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" @click="selectedSubject = null; selectedClass = null; showRecords = false;" :class="{ 'text-primary font-semibold': currentView === 'yearGroup' }">{{ selectedYearGroup }}</BreadcrumbLink>
              </BreadcrumbItem>
            </template>
            <template v-if="selectedSubject">
              <BreadcrumbSeparator>
                <ChevronRight class="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" @click="selectedClass = null; showRecords = false;" :class="{ 'text-primary font-semibold': currentView === 'subject' }">{{ selectedSubject }}</BreadcrumbLink>
              </BreadcrumbItem>
            </template>
            <template v-if="selectedClass">
              <BreadcrumbSeparator>
                <ChevronRight class="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage :class="{ 'text-primary font-semibold': currentView === 'records' }">{{ selectedClass }}</BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 class="text-4xl font-bold mb-1">
            {{ showRecords ? 'Student Records' : 'Grade Management' }}
          </h2>
          <p v-if="currentView === 'records'" class="text-sm text-muted-foreground">
            Showing records for <strong>{{ selectedSubject }}</strong> from class <strong>{{ selectedClass }}</strong>
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <Button 
            v-if="currentView === 'overview'"
            variant="default"
            @click="showAddYearGroupDialog = true"
          >
            <Plus class="mr-2 h-4 w-4" />
            New Year Group
          </Button>
          <Button 
            v-else-if="currentView === 'yearGroup'"
            variant="default"
            @click="showAddSubjectDialog = true"
          >
            <Plus class="mr-2 h-4 w-4" />
            New Subject
          </Button>
          <Button 
            v-else-if="currentView === 'subject'"
            variant="default"
            @click="showAddClassDialog = true"
          >
            <Plus class="mr-2 h-4 w-4" />
            New Class
          </Button>
          <Button 
            v-else-if="currentView === 'records'"
            variant="default"
            @click="addNewClass"
          >
            <Plus class="mr-2 h-4 w-4" />
            Add New Class
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <ScrollArea class="flex-grow">
      <div class="p-6">
        <!-- Year Group Overview -->
        <template v-if="currentView === 'overview'">
          <div v-if="yearGroups.length === 0" class="text-center py-12">
            <GraduationCap class="mx-auto h-16 w-16 text-primary mb-4" />
            <h3 class="text-2xl font-semibold mb-2">No year groups yet</h3>
            <p class="text-muted-foreground mb-6">Get started by creating your first year group.</p>
            <Button size="lg" @click="showAddYearGroupDialog = true" variant="default">
              <Plus class="mr-2 h-5 w-5" />
              Create Year Group
            </Button>
          </div>
          <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card 
              v-for="yearGroup in yearGroups" 
              :key="yearGroup.name" 
              class="hover:shadow-md transition-shadow border-border overflow-hidden"
            >
              <CardHeader class="pb-2 bg-primary/10 dark:bg-primary/20">
                <CardTitle class="text-lg font-semibold flex items-center justify-between">
                  {{ yearGroup.name }}
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" class="h-8 w-8 p-0">
                        <MoreVertical class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="deleteYearGroup(yearGroup.name)">
                        <Trash2 class="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
              </CardHeader>
              <CardContent class="pt-4">
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
                    <Book class="h-5 w-5 text-primary mb-1" />
                    <span class="text-sm font-medium">{{ yearGroup.subjects.length }}</span>
                    <span class="text-xs text-muted-foreground">Subjects</span>
                  </div>
                  <div class="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
                    <Users class="h-5 w-5 text-primary mb-1" />
                    <span class="text-sm font-medium">{{ getTotalStudents(yearGroup) }}</span>
                    <span class="text-xs text-muted-foreground">Students</span>
                  </div>
                </div>
                <Progress 
                  class="mb-4" 
                  :value="Math.min(yearGroup.subjects.length * 10, 100)" 
                />
                <Button class="w-full" variant="default" @click="selectedYearGroup = yearGroup.name">
                  Manage Year Group
                </Button>
              </CardContent>
            </Card>
            <Card 
              class="hover:shadow-md transition-shadow cursor-pointer bg-muted/50 dark:bg-muted/20 border-2 border-dashed border-primary/50" 
              @click="showAddYearGroupDialog = true"
            >
              <CardContent class="flex flex-col items-center justify-center h-full py-12">
                <div class="bg-primary/10 dark:bg-primary/20 rounded-full p-4 mb-4">
                  <Sparkles class="h-8 w-8 text-primary" />
                </div>
                <h3 class="text-lg font-semibold text-center mb-2">Add New Year Group</h3>
                <p class="text-sm text-muted-foreground text-center max-w-[200px]">Create a new year group to organize your curriculum</p>
              </CardContent>
            </Card>
          </div>
        </template>

        <!-- Improved Subject Overview -->
        <template v-else-if="currentView === 'yearGroup'">
          <div v-if="yearGroups.find(yg => yg.name === selectedYearGroup)?.subjects.length === 0" class="text-center py-12">
            <BookOpen class="mx-auto h-16 w-16 text-primary mb-4" />
            <h3 class="text-2xl font-semibold text-foreground mb-2">No subjects yet</h3>
            <p class="text-muted-foreground mb-6">Get started by creating your first subject.</p>
            <Button size="lg" @click="showAddSubjectDialog = true">
              <Plus class="mr-2 h-5 w-5" />
              Create Subject
            </Button>
          </div>
          <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card 
              v-for="subject in yearGroups.find(yg => yg.name === selectedYearGroup)?.subjects" 
              :key="subject.name" 
              class="hover:shadow-md transition-shadow overflow-hidden"
            >
              <CardHeader class="pb-3 bg-primary/10 dark:bg-primary/20">
                <CardTitle class="text-xl font-semibold flex items-center justify-between">
                  <div class="flex items-center">
                    <BookOpen class="h-5 w-5 mr-2 text-primary" />
                    {{ subject.name }}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" size="icon">
                        <MoreVertical class="h-4 w-4" />
                        <span class="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="selectedSubject = subject.name">
                        View Classes
                      </DropdownMenuItem>
                      <DropdownMenuItem @click="deleteSubject(subject.name)">
                        Delete Subject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
              </CardHeader>
              <CardContent class="pt-4">
                <div class="flex items-center justify-between mb-4">
                  <Badge variant="outline" class="bg-primary/5">{{ subject.classes.length }} Classes</Badge>
                  <Badge variant="outline" class="bg-primary/5">
                    {{ subject.classes.reduce((total, c) => total + c.students.length, 0) }} Students
                  </Badge>
                </div>
                <div class="space-y-3">
                  <div 
                    v-for="(classItem, index) in subject.classes.slice(0, 3)" 
                    :key="index" 
                    class="flex items-center justify-between bg-secondary/20 p-2 rounded-md"
                  >
                    <span class="text-sm font-medium flex items-center">
                      <Users class="h-4 w-4 mr-2 text-primary" />
                      {{ classItem.name }}
                    </span>
                    <span class="text-sm text-muted-foreground">{{ classItem.students.length }} students</span>
                  </div>
                  <div v-if="subject.classes.length > 3" class="text-sm text-muted-foreground text-center">
                    +{{ subject.classes.length - 3 }} more classes
                  </div>
                </div>
                <Progress class="mt-4" :value="Math.min(subject.classes.length * 10, 100)" />
                <Button class="w-full mt-4" variant="default" @click="selectedSubject = subject.name">
                  Manage Subject
                </Button>
              </CardContent>
            </Card>
            <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="showAddSubjectDialog = true">
              <CardContent class="flex flex-col items-center justify-center h-full py-6">
                <Plus class="h-12 w-12 text-primary mb-2" />
                <h3 class="text-lg font-semibold text-center mb-1">Add New Subject</h3>
                <p class="text-sm text-muted-foreground text-center">Create a new subject for your curriculum</p>
              </CardContent>
            </Card>
          </div>
        </template>

        <!-- Improved Class Overview -->
        <template v-else-if="currentView === 'subject'">
          <div v-if="yearGroups.find(yg => yg.name === selectedYearGroup)?.subjects.find(s => s.name === selectedSubject)?.classes.length === 0" class="text-center py-12">
            <Users class="mx-auto h-16 w-16 text-primary mb-4" />
            <h3 class="text-2xl font-semibold text-foreground mb-2">No classes yet</h3>
            <p class="text-muted-foreground mb-6">Start by adding your first class to this subject.</p>
            <Button size="lg" @click="showAddClassDialog = true">
              <Plus class="mr-2 h-5 w-5" />
              Create Class
            </Button>
          </div>
          <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card 
              v-for="classItem in yearGroups.find(yg => yg.name === selectedYearGroup)?.subjects.find(s => s.name === selectedSubject)?.classes" 
              :key="classItem.name" 
              class="hover:shadow-md transition-shadow overflow-hidden"
            >
              <CardHeader class="pb-3 bg-primary/10 dark:bg-primary/20">
                <CardTitle class="text-xl font-semibold flex items-center justify-between">
                  <div class="flex items-center">
                    <Users class="h-5 w-5 mr-2 text-primary" />
                    {{ classItem.name }}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" size="icon">
                        <MoreVertical class="h-4 w-4" />
                        <span class="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="selectedClass = classItem.name; showRecords = true;">
                        View Students
                      </DropdownMenuItem>
                      <DropdownMenuItem @click="deleteClass(classItem.name)">
                        Delete Class
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
              </CardHeader>
              <CardContent class="pt-4">
                <div class="flex items-center justify-between mb-4">
                  <Badge variant="outline" class="bg-primary/5">{{ classItem.students.length }} Students</Badge>
                </div>
                <div class="space-y-3">
                  <div 
                    v-for="(student, index) in classItem.students.slice(0, 3)" 
                    :key="index" 
                    class="flex items-center justify-between bg-secondary/20 p-2 rounded-md"
                  >
                    <span class="text-sm font-medium flex items-center">
                      <UserPlus class="h-4 w-4 mr-2 text-primary" />
                      {{ student.name }}
                    </span>
                    <span class="text-sm text-muted-foreground">{{ student.grade }}</span>
                  </div>
                  <div v-if="classItem.students.length > 3" class="text-sm text-muted-foreground text-center">
                    +{{ classItem.students.length - 3 }} more students
                  </div>
                </div>
                <Progress class="mt-4" :value="Math.min(classItem.students.length * 10, 100)" />
                <Button class="w-full mt-4" variant="default" @click="selectedClass = classItem.name; showRecords = true;">
                  View Records
                </Button>
              </CardContent>
            </Card>
            <Card class="hover:shadow-md transition-shadow cursor-pointer" @click="showAddClassDialog = true">
              <CardContent class="flex flex-col items-center justify-center h-full py-6">
                <Plus class="h-12 w-12 text-primary mb-2" />
                <h3 class="text-lg font-semibold text-center mb-1">Add New Class</h3>
                <p class="text-sm text-muted-foreground text-center">Create a new class for this subject</p>
              </CardContent>
            </Card>
          </div>
        </template>

        <!-- Improved Student Records with Enhanced Table -->
        <template v-else-if="currentView === 'records'">
          <div class="mb-6">
            <!-- Redesigned Tabs -->
            <div class="flex items-center space-x-2 mb-4 overflow-x-auto">
              <button
                v-for="classItem in currentSubjectClasses"
                :key="classItem.name"
                @click="selectedClass = classItem.name"
                class="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none whitespace-nowrap"
                :class="[
                  selectedClass === classItem.name
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                ]"
              >
                {{ classItem.name }}
              </button>
              <button
                @click="showAddClassDialog = true"
                class="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors duration-200 focus:outline-none"
                title="Add new class"
              >
                <Plus class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Enhanced Content Area -->
            <div class="bg-card shadow-sm rounded-lg overflow-hidden border border-border">
              <div class="p-4 bg-muted/30 border-b border-border flex justify-between items-center">
                <h3 class="text-lg font-semibold">Student Records</h3>
                <Badge variant="outline">{{ selectedClass }}</Badge>
              </div>
              <div class="p-4">
                <div v-if="currentClassStudents.length > 0">
                  <div class="flex justify-between items-center mb-4">
                    <div class="relative w-64">
                      <Input
                        v-model="searchQuery"
                        placeholder="Search students..."
                        class="pl-10"
                      />
                      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    <Button @click="showAddStudentForm = true" variant="default">
                      <Plus class="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </div>
                  <div class="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow class="bg-muted/50 hover:bg-muted/50">
                          <TableHead class="font-semibold">Name</TableHead>
                          <TableHead class="font-semibold">ID</TableHead>
                          <TableHead class="font-semibold">Grade</TableHead>
                          <TableHead class="font-semibold">Status</TableHead>
                          <TableHead class="font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow 
                          v-for="student in filteredStudents" 
                          :key="student.id"
                          class="hover:bg-muted/30 transition-colors"
                        >
                          <TableCell class="font-medium">{{ student.name }}</TableCell>
                          <TableCell>{{ student.id }}</TableCell>
                          <TableCell>
                            <Badge :variant="student.grade >= 70 ? 'default' : 'destructive'">
                              {{ student.grade }}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge :variant="student.status === 'Active' ? 'success' : 'warning'">
                              {{ student.status }}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div class="flex space-x-2">
                              <Button variant="ghost" size="icon" @click="editingStudent = { ...student }">
                                <Pencil class="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" @click="deleteStudent(student.id)">
                                <Trash2 class="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div class="mt-4 flex justify-between items-center text-sm text-muted-foreground">
                    <p>Showing {{ filteredStudents.length }} of {{ currentClassStudents.length }} students</p>
                    <Button variant="ghost" size="sm" @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'">
                      Sort {{ sortOrder === 'asc' ? 'Descending' : 'Ascending' }}
                    </Button>
                  </div>
                </div>
                <div v-else class="text-center py-12">
                  <div class="bg-muted/20 rounded-full p-4 inline-block mb-6">
                    <FileText class="h-12 w-12 text-primary" />
                  </div>
                  <h3 class="text-2xl font-semibold mb-2">No Records Found</h3>
                  <p class="text-muted-foreground mb-6 max-w-md mx-auto">
                    There are no student records in this class yet. Start by adding your first student to begin tracking their progress.
                  </p>
                  <Button @click="showAddStudentForm = true" variant="default" size="lg" class="gap-2">
                    <UserPlus class="h-5 w-5" />
                    Add Your First Student
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </ScrollArea>
  </div>

  <!-- Updated Dialogs -->
  <Dialog v-model:open="showAddYearGroupDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Year Group</DialogTitle>
        <DialogDescription>
          Add a new year group to your RecordFlow dashboard.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="year-group-name" class="text-right">
            Year Group Name
          </Label>
          <Input
            id="year-group-name"
            v-model="newYearGroupName"
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="addYearGroup" class="bg-primary hover:bg-primary/90 text-primary-foreground">Add Year Group</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Dialog v-model:open="showAddSubjectDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Subject</DialogTitle>
        <DialogDescription>
          Add a new subject to the year group: <strong>{{ selectedYearGroup }}</strong>
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="new-subject-name" class="text-right">
            Subject Name
          </Label>
          <Input
            id="new-subject-name"
            v-model="newSubjectName"
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="addSubject">Add Subject</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Dialog v-model:open="showAddClassDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Class</DialogTitle>
        <DialogDescription>
          Add a new class to the subject: <strong>{{ selectedSubject }}</strong>
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="new-class-name" class="text-right">
            Class Name
          </Label>
          <Input
            id="new-class-name"
            v-model="newClassName"
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="addClass">Add Class</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Dialog v-model:open="showAddStudentForm">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogDescription>
          Add a new student to the class: <strong>{{ selectedClass }}</strong>
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="student-name" class="text-right">
            Student Name
          </Label>
          <Input
            id="student-name"
            v-model="newStudent.name"
            class="col-span-3"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="student-id" class="text-right">
            Student ID
          </Label>
          <Input
            id="student-id"
            v-model="newStudent.id"
            class="col-span-3"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="student-grade" class="text-right">
            Student Grade
          </Label>
          <Input
            id="student-grade"
            v-model="newStudent.grade"
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="addStudent">Add Student</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.tab-folder {
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0 100%);
  margin-right: -20px;
  border-bottom: 1px solid transparent;
}
.tab-folder:last-child {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%);
  margin-right: 0;
}
.tab-folder.bg-card {
  border-bottom-color: var(--background);
}
</style>