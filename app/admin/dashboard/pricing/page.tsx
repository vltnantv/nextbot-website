"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { adminStore } from "@/lib/admin-store";
import type { AddOn } from "@/lib/admin-types";

export default function PricingPage() {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null,
  );

  useEffect(() => {
    loadAddOns();
  }, []);

  const loadAddOns = () => {
    setAddOns(adminStore.getAddOns());
    setHasChanges(false);
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveChanges = () => {
    addOns.forEach((addon) => adminStore.saveAddOn(addon));
    setHasChanges(false);
    showToast("Промените са запазени успешно", "success");
  };

  const handleFieldChange = (
    id: string,
    field: keyof AddOn,
    value: any,
  ) => {
    setAddOns(
      addOns.map((addon) =>
        addon.id === id ? { ...addon, [field]: value } : addon,
      ),
    );
    setHasChanges(true);
  };

  const handleDeleteAddon = (id: string) => {
    adminStore.deleteAddOn(id);
    loadAddOns();
    showToast("Добавка изтрита", "success");
  };

  const handleAddNew = () => {
    const newAddon: AddOn = {
      id: adminStore.generateId(),
      icon: "✨",
      title: "Нова добавка",
      description: "Описание на новата добавка",
      price: 49,
      popular: false,
      active: true,
      category: "channel",
    };
    adminStore.saveAddOn(newAddon);
    loadAddOns();
    showToast("Нова добавка създадена", "success");
  };

  const basePrice = 299;
  const exampleConfigs = [
    {
      name: "Small Hotel",
      addons: ["addon_1", "addon_3"],
      label: "WhatsApp + Немски",
    },
    {
      name: "Medium Hotel",
      addons: ["addon_1", "addon_3", "addon_4", "addon_5"],
      label: "WhatsApp + Немски + Integration + Unlimited",
    },
    {
      name: "E-commerce",
      addons: ["addon_2", "addon_5"],
      label: "Facebook + Unlimited",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#1D1D1F]">
            Ценообразуване
          </h1>
          <p className="text-[13px] text-[#6E6E73] mt-1">
            Промените се отразяват на публичния сайт
          </p>
        </div>

        <div className="flex gap-3">
          {hasChanges && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={handleSaveChanges}
              className="h-10 px-6 rounded-lg bg-[#34C759] hover:bg-[#30B350] text-white text-[13px] font-semibold transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <span>💾</span>
              <span>Запази промените</span>
            </motion.button>
          )}

          <button
            onClick={handleAddNew}
            className="h-10 px-4 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-semibold transition-all active:scale-[0.98] flex items-center gap-2"
          >
            <span>➕</span>
            <span>Нова добавка</span>
          </button>
        </div>
      </div>

      {/* Base Price Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#E5E5EA] p-6"
      >
        <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-4">
          Базова цена
        </h2>

        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <div className="text-[48px] font-bold text-[#0071E3]">
              {basePrice}
              <span className="text-[20px] text-[#6E6E73] ml-2">лв/мес</span>
            </div>
          </div>

          <div className="flex-1 border-l border-[#E5E5EA] pl-6">
            <p className="text-[13px] text-[#6E6E73] mb-2">
              Включени функции в базовата цена:
            </p>
            <ul className="space-y-1">
              {[
                "AI чат асистент (24/7)",
                "Български + Английски",
                "Lead capture (Име, Email, Телефон)",
                "Месечен performance отчет",
                "Email поддръжка",
              ].map((feature, i) => (
                <li key={i} className="text-[13px] text-[#1D1D1F] flex items-center gap-2">
                  <span className="text-[#34C759]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Add-ons Manager */}
      <div className="bg-white rounded-xl border border-[#E5E5EA] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5EA]">
          <h2 className="text-[17px] font-semibold text-[#1D1D1F]">
            Добавки
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F7] border-b border-[#E5E5EA]">
              <tr>
                <th className="w-16 px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Icon
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Заглавие
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Описание
                </th>
                <th className="w-24 px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Цена
                </th>
                <th className="w-24 px-4 py-3 text-center text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Popular
                </th>
                <th className="w-24 px-4 py-3 text-center text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Active
                </th>
                <th className="w-20 px-4 py-3 text-right text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {addOns.map((addon, index) => (
                <tr
                  key={addon.id}
                  className={`
                    border-b border-[#E5E5EA] transition-colors
                    ${index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
                    hover:bg-[#F5F5F7]
                  `}
                >
                  {/* Icon */}
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      value={addon.icon}
                      onChange={(e) =>
                        handleFieldChange(addon.id, "icon", e.target.value)
                      }
                      className="w-12 h-10 text-center text-[20px] rounded-lg border border-[#D2D2D7] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
                    />
                  </td>

                  {/* Title */}
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      value={addon.title}
                      onChange={(e) =>
                        handleFieldChange(addon.id, "title", e.target.value)
                      }
                      className="w-full h-10 px-3 rounded-lg border border-[#D2D2D7] text-[13px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
                    />
                  </td>

                  {/* Description */}
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      value={addon.description}
                      onChange={(e) =>
                        handleFieldChange(
                          addon.id,
                          "description",
                          e.target.value,
                        )
                      }
                      className="w-full h-10 px-3 rounded-lg border border-[#D2D2D7] text-[13px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
                    />
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        value={addon.price}
                        onChange={(e) =>
                          handleFieldChange(
                            addon.id,
                            "price",
                            parseInt(e.target.value),
                          )
                        }
                        className="w-20 h-10 px-2 rounded-lg border border-[#D2D2D7] text-[13px] text-right focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
                      />
                      <span className="text-[11px] text-[#6E6E73]">лв</span>
                    </div>
                  </td>

                  {/* Popular */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() =>
                        handleFieldChange(addon.id, "popular", !addon.popular)
                      }
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${addon.popular ? "bg-[#34C759]" : "bg-[#D2D2D7]"}
                      `}
                    >
                      <span
                        className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${addon.popular ? "translate-x-6" : "translate-x-1"}
                      `}
                      />
                    </button>
                  </td>

                  {/* Active */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() =>
                        handleFieldChange(addon.id, "active", !addon.active)
                      }
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${addon.active ? "bg-[#0071E3]" : "bg-[#D2D2D7]"}
                      `}
                    >
                      <span
                        className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${addon.active ? "translate-x-6" : "translate-x-1"}
                      `}
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleDeleteAddon(addon.id)}
                      className="p-2 rounded-lg hover:bg-[#FF3B30]/10 text-[#FF3B30] transition-colors"
                      title="Изтрий"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Impact Preview */}
      <div className="bg-gradient-to-br from-[#F5F5F7] to-white rounded-xl border border-[#E5E5EA] p-6">
        <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-4">
          Примерни конфигурации
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exampleConfigs.map((config) => {
            const selectedAddons = addOns.filter((a) =>
              config.addons.includes(a.id),
            );
            const total =
              basePrice +
              selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

            return (
              <div
                key={config.name}
                className="bg-white rounded-lg border border-[#E5E5EA] p-4"
              >
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-2">
                  {config.name}
                </h3>
                <p className="text-[11px] text-[#6E6E73] mb-3">
                  {config.label}
                </p>
                <div className="text-[24px] font-bold text-[#0071E3]">
                  {total}
                  <span className="text-[13px] text-[#6E6E73] ml-1">
                    лв/мес
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast */}
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
    </div>
  );
}
