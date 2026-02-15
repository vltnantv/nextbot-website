'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState<any>(null)
  const [bots, setBots] = useState<any[]>([])

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: companyData } = await supabase.from('companies').select('*').eq('id', user.id).single()
      setCompany(companyData)

      const { data: botsData } = await supabase.from('bots').select('*').eq('company_id', user.id)
      setBots(botsData || [])
    } catch (error) {
      console.error('Dashboard load error:', error)
    } finally {
      setLoading(false)
    }
  }

  const trialDaysRemaining = company?.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(company.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 30

  const isTrialActive = company?.subscription_status === 'trial' && trialDaysRemaining > 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const hasBot = bots.length > 0
  const activeBot = bots.find(b => b.is_active)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Добре дошъл, {company?.company_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Управлявай твоя AI асистент от тук
        </p>
      </div>

      {isTrialActive && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Trial Active</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{trialDaysRemaining} дни остават от безплатния период</p>
            </div>
            <Link href="/dashboard/billing" className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Upgrade
            </Link>
          </div>
        </div>
      )}

      {!hasBot ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🤖</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Създай първия си AI асистент</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Попълни формата и ние ще настроим Neo специално за твоя бизнес за 1 час
          </p>
          <Link href="/dashboard/bots/new" className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
            Създай Bot
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Conversations</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {bots.reduce((sum, b) => sum + (b.total_conversations || 0), 0)}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Messages</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {bots.reduce((sum, b) => sum + (b.total_messages || 0), 0)}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
            <div className={`text-3xl font-bold ${activeBot ? 'text-green-600' : 'text-yellow-600'}`}>
              {activeBot ? '🟢 Live' : '🟡 Setup'}
            </div>
          </div>
        </div>
      )}

      {hasBot && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Your Bots</h3>
          <div className="space-y-4">
            {bots.map(bot => (
              <div key={bot.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{bot.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status: {bot.status} • {bot.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <Link href={`/dashboard/bots/${bot.id}`} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Manage
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
