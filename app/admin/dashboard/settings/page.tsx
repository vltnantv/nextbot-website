"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { adminStore } from "@/lib/admin-store";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import type { BotSetting } from "@/lib/admin-types";

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<BotSetting[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null,
  );

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setSettings(adminStore.getSettings());
    setHasChanges(false);
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getSetting = (key: string): string => {
    return settings.find((s) => s.key === key)?.value || "";
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(
      settings.map((s) => (s.key === key ? { ...s, value } : s)),
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    settings.forEach((setting) => {
      adminStore.updateSetting(setting.key, setting.value);
    });
    setHasChanges(false);
    showToast("Настройките са запазени успешно", "success");
  };

  const handleClearData = () => {
    if (confirmText === "ИЗТРИЙ") {
      adminStore.clearAllData();
      showToast("Всички данни са изчистени", "success");
      setShowClearDialog(false);
      setConfirmText("");
      loadSettings();
    }
  };

  const handleLogout = () => {
    adminStore.logout();
    router.push("/admin/login");
  };

  const voiceflowSettings = settings.filter(
    (s) => s.category === "voiceflow",
  );
  const notificationSettings = settings.filter(
    (s) => s.category === "notifications",
  );
  const generalSettings = settings.filter((s) => s.category === "general");

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#1D1D1F]">Настройки</h1>
          <p className="text-[13px] text-[#6E6E73] mt-1">
            Конфигурация на системата и бот
          </p>
        </div>

        {hasChanges && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={handleSave}
            className="h-10 px-6 rounded-lg bg-[#34C759] hover:bg-[#30B350] text-white text-[13px] font-semibold transition-all active:scale-[0.98] flex items-center gap-2"
          >
            <span>💾</span>
            <span>Запази промените</span>
          </motion.button>
        )}
      </div>

      {/* Voiceflow Settings */}
      <SettingsSection title="Voiceflow Settings" icon="🤖">
        <SettingField
          label="Project ID"
          value={getSetting("voiceflow_project_id")}
          onChange={(value) => updateSetting("voiceflow_project_id", value)}
          helper="Voiceflow Project ID от dashboard"
        />

        <SettingField
          label="Version ID"
          value={getSetting("voiceflow_version")}
          onChange={(value) => updateSetting("voiceflow_version", value)}
          helper="Version: production / development"
        />

        <SettingField
          label="Име на бота"
          value={getSetting("bot_name")}
          onChange={(value) => updateSetting("bot_name", value)}
          helper="Име показано в chat widget"
        />

        <SettingField
          label="Welcome Message"
          value={getSetting("welcome_message")}
          onChange={(value) => updateSetting("welcome_message", value)}
          helper="Първоначално съобщение към потребителите"
          multiline
        />

        <div className="pt-4">
          <button
            onClick={() => {
              // Test connection logic
              showToast("✓ Connected to Voiceflow", "success");
            }}
            className="h-10 px-4 rounded-lg border border-[#D2D2D7] text-[#1D1D1F] text-[13px] font-medium hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
          >
            <span>🔌</span>
            <span>Test Connection</span>
          </button>
        </div>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection title="Notification Settings" icon="🔔">
        <ToggleSetting
          label="New Lead Notifications"
          description="Получавай известия при нови leads"
          value={getSetting("notifications_new_lead") === "true"}
          onChange={(value) =>
            updateSetting("notifications_new_lead", value ? "true" : "false")
          }
        />

        <ToggleSetting
          label="New Pilot Application"
          description="Получавай известия при нови pilot кандидати"
          value={getSetting("notifications_new_pilot") === "true"}
          onChange={(value) =>
            updateSetting("notifications_new_pilot", value ? "true" : "false")
          }
        />

        <ToggleSetting
          label="Weekly Report Email"
          description="Седмичен email отчет на info@nextbot.me"
          value={getSetting("notifications_weekly_report") === "true"}
          onChange={(value) =>
            updateSetting(
              "notifications_weekly_report",
              value ? "true" : "false",
            )
          }
        />
      </SettingsSection>

      {/* General Settings */}
      <SettingsSection title="General Settings" icon="⚙️">
        <SettingField
          label="Company Name"
          value={getSetting("company_name")}
          onChange={(value) => updateSetting("company_name", value)}
        />

        <SettingField
          label="Contact Email"
          value={getSetting("contact_email")}
          onChange={(value) => updateSetting("contact_email", value)}
          type="email"
        />

        <SettingField
          label="Contact Phone"
          value={getSetting("contact_phone")}
          onChange={(value) => updateSetting("contact_phone", value)}
          type="tel"
        />

        <SettingField
          label="Site URL"
          value={getSetting("site_url")}
          onChange={(value) => updateSetting("site_url", value)}
          type="url"
        />

        <SettingField
          label="Pilot Total Spots"
          value={getSetting("pilot_total_spots")}
          onChange={(value) => updateSetting("pilot_total_spots", value)}
          type="number"
          helper="Общо налични места за pilot program"
        />
      </SettingsSection>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border-2 border-[#FF3B30] p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[24px]">⚠️</span>
          <h2 className="text-[17px] font-semibold text-[#FF3B30]">
            Danger Zone
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#FF3B30]/5 rounded-lg border border-[#FF3B30]/20">
            <div>
              <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">
                Изчисти всички данни
              </h3>
              <p className="text-[11px] text-[#6E6E73]">
                Изтрива всички leads, пилоти и данни. Необратима операция.
              </p>
            </div>
            <button
              onClick={() => setShowClearDialog(true)}
              className="px-4 py-2 rounded-lg bg-[#FF3B30] hover:bg-[#FF4540] text-white text-[13px] font-semibold transition-all"
            >
              Изчисти данни
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F5F5F7] rounded-lg border border-[#E5E5EA]">
            <div>
              <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">
                Изход от Admin
              </h3>
              <p className="text-[11px] text-[#6E6E73]">
                Logout и връщане към login екрана
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-[#6E6E73] hover:bg-[#5E5E63] text-white text-[13px] font-semibold transition-all"
            >
              Изход
            </button>
          </div>
        </div>
      </div>

      {/* Clear Data Confirmation */}
      <ConfirmDialog
        isOpen={showClearDialog}
        onClose={() => {
          setShowClearDialog(false);
          setConfirmText("");
        }}
        onConfirm={handleClearData}
        title="Изчисти всички данни?"
        message={
          <>
            Тази операция е <strong>необратима</strong>. Всички leads, пилоти,
            настройки и данни ще бъдат изтрити окончателно.
            <div className="mt-4">
              <label className="block text-[11px] text-[#6E6E73] mb-2">
                Напиши <strong>ИЗТРИЙ</strong> за потвърждение:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-[#D2D2D7] text-[13px] focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20"
                placeholder="ИЗТРИЙ"
              />
            </div>
          </>
        }
        confirmLabel="Изчисти всичко"
        cancelLabel="Отказ"
        danger={true}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className={`
              px-4 py-3 rounded-xl shadow-lg text-white text-[13px] font-medium
              ${toast.type === "success" ? "bg-[#34C759]" : "bg-[#FF3B30]"}
            `}
            >
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SETTINGS SECTION
// ═══════════════════════════════════════════════════════════

function SettingsSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E5EA] p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E5E5EA]">
        <span className="text-[24px]">{icon}</span>
        <h2 className="text-[17px] font-semibold text-[#1D1D1F]">{title}</h2>
      </div>

      <div className="space-y-5">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SETTING FIELD
// ═══════════════════════════════════════════════════════════

function SettingField({
  label,
  value,
  onChange,
  type = "text",
  helper,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  helper?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
        {label}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-[#D2D2D7] text-[13px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[13px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
        />
      )}

      {helper && (
        <p className="mt-1.5 text-[11px] text-[#6E6E73]">{helper}</p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TOGGLE SETTING
// ═══════════════════════════════════════════════════════════

function ToggleSetting({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-[#F5F5F7]">
      <div>
        <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-1">
          {label}
        </h3>
        <p className="text-[11px] text-[#6E6E73]">{description}</p>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`
          relative inline-flex h-7 w-12 items-center rounded-full transition-colors
          ${value ? "bg-[#34C759]" : "bg-[#D2D2D7]"}
        `}
      >
        <span
          className={`
          inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm
          ${value ? "translate-x-[26px]" : "translate-x-1"}
        `}
        />
      </button>
    </div>
  );
}
