'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function DashboardNav() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">N</div>
            <span className="font-semibold text-xl text-gray-900 dark:text-white">Nextbot</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Dashboard</Link>
            <Link href="/dashboard/bots" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Bots</Link>
            <Link href="/dashboard/billing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Billing</Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</span>
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
