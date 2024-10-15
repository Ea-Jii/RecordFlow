import { defineStore } from 'pinia'

export const useRecordsStore = defineStore('records', {
  state: () => ({
    yearGroups: [],
    totalSubjects: 0,
    totalClasses: 0,
    totalStudents: 0,
    showAddYearGroupDialog: false,
    showAddSubjectDialog: false,
    showAddClassDialog: false,
    recentActivities: [],
    topPerformingStudents: [],
    averageGrade: 0,
    subjectPerformance: [],
  }),
  actions: {
    fetchAllData() {
      // Implement data fetching logic here
      // Don't forget to populate recentActivities
      this.calculateAverageGrade() // Call this after fetching data
    },
    fetchTopPerformingStudents() {
      // Implement the logic to fetch top performing students
      // This is a placeholder implementation
      this.topPerformingStudents = [
        { id: '1', name: 'John Doe', class: 'Grade 10A', grade: 95 },
        { id: '2', name: 'Jane Smith', class: 'Grade 11B', grade: 92 },
        { id: '3', name: 'Alice Johnson', class: 'Grade 9C', grade: 90 },
      ];
    },
    calculateAverageGrade() {
      // Implement the logic to calculate the average grade
      // This is a placeholder implementation
      if (this.topPerformingStudents.length > 0) {
        const sum = this.topPerformingStudents.reduce((acc, student) => acc + student.grade, 0)
        this.averageGrade = Math.round(sum / this.topPerformingStudents.length)
      } else {
        this.averageGrade = 0
      }
    },
    fetchSubjectPerformance() {
      // Implement the logic to fetch subject performance data
      // This is a placeholder implementation
      this.subjectPerformance = [
        { name: 'Math', averageGrade: 85 },
        { name: 'Science', averageGrade: 78 },
        { name: 'English', averageGrade: 82 },
      ];
    },
  },
})
