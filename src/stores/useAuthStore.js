import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { logoutUser, checkNeedsPassword } from '@/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const needsPassword = ref(false)

  const setUser = (newUser) => {
    user.value = newUser
    isAuthenticated.value = !!newUser
    needsPassword.value = newUser ? checkNeedsPassword(newUser) : false
  }

  const fetchUser = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser)
        resolve(firebaseUser)
        unsubscribe()
      })
    })
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user,
    isAuthenticated,
    needsPassword,
    setUser,
    fetchUser,
    logout
  }
})
