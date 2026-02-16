'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function BillingPage() {
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBilling()
  }, [])

  const loadBilling = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase.from('companies').select('*').eq('id', user!.id).single()
      setCompany(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const trialDaysRemaining = company?.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(company.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 30

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>

  const plans = [
    {
      name: 'Starter',
      price: '€120',
      period: '/месец',
      features: [
        '1,000 съобщения месечно',
        '1 канал (WhatsApp или Messenger)',
        'Основни интеграции',
        'Email поддръжка'
      ],
      stripeLink: 'https://buy.stripe.com/test_XXXXXX'
    },
    {
      name: 'Professional',
      price: '€240',
      period: '/месец',
      features: [
        '5,000 съобщения месечно',
        'До 3 канала',
        'Всички интеграции (Calendar, CRM)',
        'Приоритетна поддръжка',
        'Анализи и отчети'
      ],
      stripeLink: 'https://buy.stripe.com/test_YYYYYY',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Неограничени съобщения',
        'Всички канали',
        'Dedicated AI модел',
        '24/7 телефонна поддръжка',
        'Custom интеграции',
        'SLA гаранция'
      ],
      stripeLink: '/contact'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400">Управлявай subscription и плащания</p>
      </div>

      {company?.subscription_status === 'trial' && (
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Trial Active</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {trialDaysRemaining} дни остават. Избери план за да продължиш да ползваш Neo след trial-а.
          </p>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(trialDaysRemaining / 30) * 100}%` }}></div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div key={i} className={`relative p-8 rounded-2xl border-2 ${plan.popular ? 'border-blue-600 shadow-2xl' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-gray-900`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold">
                Популярен
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
              <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>

            <a href={plan.stripeLink} target={plan.name === 'Enterprise' ? '_self' : '_blank'} rel="noopener noreferrer"
              className={`block w-full px-6 py-3 rounded-full text-center font-semibold transition-colors ${
                plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
              {plan.name === 'Enterprise' ? 'Свържи се' : 'Избери план'}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Често задавани въпроси</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Мога ли да сменя плана си?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Да, по всяко време. Upgrade е веднага, downgrade важи от следващия месец.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Какво се случва ако надхвърля лимита?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">€0.05 per съобщение над лимита. Ще получиш нотификация на 80% usage.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Мога ли да откажа subscription-а?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Да, по всяко време. Няма commitment. Email-ни на billing@nextbot.me.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
