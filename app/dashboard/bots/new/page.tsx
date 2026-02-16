'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewBotPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessType: '',
    channels: [] as string[],
    expectedVolume: '',
    useCases: '',
    additionalInfo: ''
  })

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase.from('bot_requests').insert({
        company_id: user!.id,
        business_type: formData.businessType,
        channels: formData.channels,
        expected_volume: formData.expectedVolume,
        use_cases: formData.useCases,
        additional_info: formData.additionalInfo,
        status: 'pending'
      })

      if (error) throw error

      await fetch('/api/notify-bot-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userEmail: user!.email })
      })

      alert('Заявката е изпратена! Ще се свържем с теб до 24 часа.')
      router.push('/dashboard')
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const channels = [
    { value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { value: 'messenger', label: 'Facebook Messenger', icon: '📱' },
    { value: 'instagram', label: 'Instagram DM', icon: '📷' },
    { value: 'web', label: 'Web Chat', icon: '💻' }
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Създай AI Асистент</h1>
        <p className="text-gray-600 dark:text-gray-400">Попълни формата и ние ще настроим всичко за теб</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Тип бизнес</label>
          <select required value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option value="">Избери...</option>
            <option value="hotel">Хотел/Настаняване</option>
            <option value="restaurant">Ресторант/Заведение</option>
            <option value="ecommerce">E-commerce</option>
            <option value="services">Услуги</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">Канали (избери всички)</label>
          <div className="grid sm:grid-cols-2 gap-4">
            {channels.map(channel => (
              <button key={channel.value} type="button" onClick={() => toggleChannel(channel.value)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${formData.channels.includes(channel.value)
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-800'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{channel.icon}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{channel.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Очакван обем съобщения месечно</label>
          <select required value={formData.expectedVolume} onChange={(e) => setFormData({ ...formData, expectedVolume: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option value="">Избери...</option>
            <option value="< 1000">Под 1,000</option>
            <option value="1000-5000">1,000 - 5,000</option>
            <option value="5000+">Над 5,000</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Основни use cases</label>
          <textarea required rows={4} value={formData.useCases} onChange={(e) => setFormData({ ...formData, useCases: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Например: Резервации на стаи, отговори на често задавани въпроси, поръчки за доставка..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Допълнителна информация (optional)</label>
          <textarea rows={3} value={formData.additionalInfo} onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Специфични нужди, интеграции, и т.н."></textarea>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Какво следва?</h3>
          <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>1. Ще получиш потвърждение на email</li>
            <li>2. Нашият екип ще се свърже с теб до 24 часа</li>
            <li>3. Настройваме Neo специално за теб (1 час)</li>
            <li>4. Тестваме заедно</li>
            <li>5. Пускаме на живо!</li>
          </ol>
        </div>

        <button type="submit" disabled={loading}
          className={`w-full px-8 py-4 rounded-full font-semibold text-white transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {loading ? 'Изпращане...' : 'Изпрати заявка'}
        </button>
      </form>
    </div>
  )
}
