'use client'

import { useRouter } from 'next/navigation'
import { RegistrationPage } from '@/components/RegistrationPage'

export default function Register() {
  const router = useRouter()

  const handleNavigate = (page: 'landing' | 'login' | 'register' | 'dashboard') => {
    switch (page) {
      case 'landing':
        router.push('/')
        break
      case 'login':
        router.push('/login')
        break
      case 'register':
        router.push('/register')
        break
      case 'dashboard':
        router.push('/dashboard')
        break
    }
  }

  return <RegistrationPage onNavigate={handleNavigate} />
}