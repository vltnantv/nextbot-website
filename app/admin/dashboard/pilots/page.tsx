"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminStore } from "@/lib/admin-store";
import { Modal } from "@/components/admin/Modal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import type { PilotApplication } from "@/lib/admin-types";

type StatusFilter = "all" | PilotApplication["status"];

export default function PilotsPage() {
  const [pilots, setPilots] = useState<PilotApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPilot, setEditingPilot] = useState<PilotApplication | null>(
    null,
  );
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null,
  );

  useEffect(() => {
    loadPilots();
  }, []);

  const loadPilots = () => {
    setPilots(adminStore.getPilots());
  };

  const filteredPilots =
    statusFilter === "all"
      ? pilots
      : pilots.filter((p) => p.status === statusFilter);

  const statusCounts = {
    pending: pilots.filter((p) => p.status === "pending").length,
    approved: pilots.filter((p) => p.status === "approved").length,
    active: pilots.filter((p) => p.status === "active").length,
    completed: pilots.filter((p) => p.status === "completed").length,
    rejected: pilots.filter((p) => p.status === "rejected").length,
  };

  const totalPilotSpots = 10;
  const usedSpots = pilots.filter(
    (p) => p.status === "active" || p.status === "approved",
  ).length;
  const availableSpots = totalPilotSpots - usedSpots;

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = (pilot: PilotApplication) => {
    setEditingPilot(pilot);
    setIsEditModalOpen(true);
  };

  const handleStatusChange = (
    id: string,
    status: PilotApplication["status"],
  ) => {
    adminStore.updatePilotStatus(id, status);
    loadPilots();
    showToast("Статус обновен успешно", "success");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#1D1D1F]">
            Pilot Program
          </h1>
          <p className="text-[13px] text-[#6E6E73] mt-1">
            {availableSpots} от {totalPilotSpots} места свободни
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="h-10 px-4 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-semibold transition-all active:scale-[0.98] flex items-center gap-2"
        >
          <span>➕</span>
          <span>Нов Пилот</span>
        </button>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#E5E5EA] p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-semibold text-[#1D1D1F]">
            Pilot Spots: {usedSpots}/{totalPilotSpots}
          </h2>
          <div className="flex items-center gap-4 text-[13px]">
            <span className="text-[#34C759] font-semibold">
              {usedSpots} активни
            </span>
            <span className="text-[#6E6E73]">
              {availableSpots} свободни
            </span>
          </div>
        </div>

        <div className="h-3 bg-[#E5E5EA] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(usedSpots / totalPilotSpots) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#0071E3] to-[#06B6D4]"
          />
        </div>
      </motion.div>

      {/* Status Tabs */}
      <div className="flex gap-2 border-b border-[#E5E5EA]">
        {[
          { key: "all", label: "Всички", count: pilots.length },
          { key: "pending", label: "Чакащи", count: statusCounts.pending },
          { key: "approved", label: "Одобрени", count: statusCounts.approved },
          { key: "active", label: "Активни", count: statusCounts.active },
          {
            key: "completed",
            label: "Завършени",
            count: statusCounts.completed,
          },
          { key: "rejected", label: "Отхвърлени", count: statusCounts.rejected },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key as StatusFilter)}
            className={`
              px-4 py-2.5 text-[13px] font-medium transition-all relative
              ${
                statusFilter === tab.key
                  ? "text-[#0071E3]"
                  : "text-[#6E6E73] hover:text-[#1D1D1F]"
              }
            `}
          >
            {tab.label} ({tab.count})
            {statusFilter === tab.key && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071E3]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Pilot Cards Grid */}
      <motion.div
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPilots.map((pilot) => (
          <PilotCard
            key={pilot.id}
            pilot={pilot}
            onEdit={() => handleEdit(pilot)}
            onStatusChange={(status) => handleStatusChange(pilot.id, status)}
          />
        ))}
      </motion.div>

      {filteredPilots.length === 0 && (
        <div className="py-16 text-center bg-white rounded-xl border border-[#E5E5EA]">
          <p className="text-[15px] text-[#6E6E73] mb-2">
            Няма намерени пилоти
          </p>
          <p className="text-[13px] text-[#8E8E93]">
            Изберете друг статус или добавете нов пилот
          </p>
        </div>
      )}

      {/* Add Pilot Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Нов Пилот"
        size="md"
      >
        <PilotForm
          onSave={(pilot) => {
            adminStore.savePilot(pilot);
            loadPilots();
            setIsAddModalOpen(false);
            showToast("Пилот създаден успешно", "success");
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Pilot Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPilot(null);
        }}
        title="Редактирай Пилот"
        size="md"
      >
        {editingPilot && (
          <PilotForm
            initialPilot={editingPilot}
            onSave={(pilot) => {
              adminStore.savePilot(pilot);
              loadPilots();
              setIsEditModalOpen(false);
              setEditingPilot(null);
              showToast("Пилот обновен успешно", "success");
            }}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingPilot(null);
            }}
          />
        )}
      </Modal>

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
// PILOT CARD COMPONENT
// ═══════════════════════════════════════════════════════════

function PilotCard({
  pilot,
  onEdit,
  onStatusChange,
}: {
  pilot: PilotApplication;
  onEdit: () => void;
  onStatusChange: (status: PilotApplication["status"]) => void;
}) {
  const statusConfig = {
    pending: {
      color: "border-[#FF9500]",
      bg: "bg-[#FF9500]",
      text: "text-white",
      label: "Чакащ",
      dot: "bg-[#FF9500]",
    },
    approved: {
      color: "border-[#0071E3]",
      bg: "bg-[#0071E3]",
      text: "text-white",
      label: "Одобрен",
      dot: "bg-[#0071E3]",
    },
    active: {
      color: "border-[#34C759]",
      bg: "bg-[#34C759]",
      text: "text-white",
      label: "Активен",
      dot: "bg-[#34C759]",
    },
    completed: {
      color: "border-[#6E6E73]",
      bg: "bg-[#6E6E73]",
      text: "text-white",
      label: "Завършен",
      dot: "bg-[#6E6E73]",
    },
    rejected: {
      color: "border-[#FF3B30]",
      bg: "bg-[#FF3B30]",
      text: "text-white",
      label: "Отхвърлен",
      dot: "bg-[#FF3B30]",
    },
  };

  const config = statusConfig[pilot.status];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-xl border-l-4 ${config.color} border-r border-t border-b border-[#E5E5EA] p-6 shadow-sm hover:shadow-md transition-all cursor-pointer`}
    >
      {/* Hotel Name */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[18px] font-bold text-[#1D1D1F] leading-tight">
          {pilot.hotelName}
        </h3>
        <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      </div>

      {/* Location & Rooms */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[13px] text-[#6E6E73]">📍 {pilot.city}</span>
        <span className="text-[13px] text-[#6E6E73]">
          🛏️ {pilot.rooms} стаи
        </span>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${config.bg} ${config.text}`}
        >
          {config.label}
        </span>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4 pb-4 border-b border-[#E5E5EA]">
        <p className="text-[13px] text-[#1D1D1F] font-medium">
          {pilot.contactName}
        </p>
        <a
          href={`mailto:${pilot.email}`}
          className="text-[11px] text-[#0071E3] hover:underline block"
        >
          {pilot.email}
        </a>
        <a
          href={`tel:${pilot.phone}`}
          className="text-[11px] text-[#0071E3] hover:underline block"
        >
          {pilot.phone}
        </a>
      </div>

      {/* Dates */}
      <div className="space-y-1 mb-4 text-[11px] text-[#6E6E73]">
        <p>
          Кандидатствал:{" "}
          {new Date(pilot.appliedAt).toLocaleDateString("bg-BG")}
        </p>
        {pilot.startDate && (
          <p>
            Старт: {new Date(pilot.startDate).toLocaleDateString("bg-BG")}
          </p>
        )}
        {pilot.endDate && (
          <p>
            Край: {new Date(pilot.endDate).toLocaleDateString("bg-BG")}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 h-9 rounded-lg border border-[#D2D2D7] text-[#1D1D1F] text-[13px] font-medium hover:bg-[#F5F5F7] transition-all"
        >
          Редактирай
        </button>

        {pilot.status === "pending" && (
          <>
            <button
              onClick={() => onStatusChange("approved")}
              className="flex-1 h-9 rounded-lg bg-[#34C759] hover:bg-[#30B350] text-white text-[13px] font-semibold transition-all"
            >
              Одобри
            </button>
            <button
              onClick={() => onStatusChange("rejected")}
              className="h-9 px-3 rounded-lg bg-[#FF3B30] hover:bg-[#FF4540] text-white text-[13px] font-semibold transition-all"
            >
              ✕
            </button>
          </>
        )}

        {pilot.status === "approved" && (
          <button
            onClick={() => onStatusChange("active")}
            className="flex-1 h-9 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-semibold transition-all"
          >
            Активирай
          </button>
        )}

        {pilot.status === "active" && (
          <button
            onClick={() => onStatusChange("completed")}
            className="flex-1 h-9 rounded-lg bg-[#6E6E73] hover:bg-[#5E5E63] text-white text-[13px] font-semibold transition-all"
          >
            Завърши
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// PILOT FORM COMPONENT
// ═══════════════════════════════════════════════════════════

function PilotForm({
  initialPilot,
  onSave,
  onCancel,
}: {
  initialPilot?: PilotApplication;
  onSave: (pilot: PilotApplication) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<PilotApplication>>(
    initialPilot || {
      hotelName: "",
      contactName: "",
      email: "",
      phone: "",
      rooms: 20,
      city: "",
      website: "",
      status: "pending",
      notes: "",
    },
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.hotelName?.trim()) {
      newErrors.hotelName = "Име на хотел е задължително";
    }
    if (!formData.contactName?.trim()) {
      newErrors.contactName = "Име на контакт е задължително";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email е задължителен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невалиден email формат";
    }
    if (!formData.city?.trim()) {
      newErrors.city = "Град е задължителен";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pilot: PilotApplication = {
      id: initialPilot?.id || adminStore.generateId(),
      hotelName: formData.hotelName!,
      contactName: formData.contactName!,
      email: formData.email!,
      phone: formData.phone || "",
      rooms: formData.rooms!,
      city: formData.city!,
      website: formData.website || "",
      status: formData.status as PilotApplication["status"],
      appliedAt: initialPilot?.appliedAt || new Date().toISOString(),
      notes: formData.notes || "",
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    onSave(pilot);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Hotel Name */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Име на хотел *
        </label>
        <input
          type="text"
          value={formData.hotelName || ""}
          onChange={(e) =>
            setFormData({ ...formData, hotelName: e.target.value })
          }
          className={`w-full h-11 px-4 rounded-lg border ${errors.hotelName ? "border-[#FF3B30]" : "border-[#D2D2D7]"} text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20`}
        />
        {errors.hotelName && (
          <p className="mt-1 text-[11px] text-[#FF3B30]">{errors.hotelName}</p>
        )}
      </div>

      {/* Contact Name */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Име на контакт *
        </label>
        <input
          type="text"
          value={formData.contactName || ""}
          onChange={(e) =>
            setFormData({ ...formData, contactName: e.target.value })
          }
          className={`w-full h-11 px-4 rounded-lg border ${errors.contactName ? "border-[#FF3B30]" : "border-[#D2D2D7]"} text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20`}
        />
        {errors.contactName && (
          <p className="mt-1 text-[11px] text-[#FF3B30]">
            {errors.contactName}
          </p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`w-full h-11 px-4 rounded-lg border ${errors.email ? "border-[#FF3B30]" : "border-[#D2D2D7]"} text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20`}
          />
          {errors.email && (
            <p className="mt-1 text-[11px] text-[#FF3B30]">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
            Телефон
          </label>
          <input
            type="tel"
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
          />
        </div>
      </div>

      {/* City & Rooms */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
            Град *
          </label>
          <input
            type="text"
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`w-full h-11 px-4 rounded-lg border ${errors.city ? "border-[#FF3B30]" : "border-[#D2D2D7]"} text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20`}
          />
          {errors.city && (
            <p className="mt-1 text-[11px] text-[#FF3B30]">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
            Брой стаи
          </label>
          <input
            type="number"
            min="1"
            value={formData.rooms || 20}
            onChange={(e) =>
              setFormData({ ...formData, rooms: parseInt(e.target.value) })
            }
            className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
          />
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Website
        </label>
        <input
          type="url"
          value={formData.website || ""}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
          className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
          placeholder="https://"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Статус
        </label>
        <select
          value={formData.status || "pending"}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as PilotApplication["status"],
            })
          }
          className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
        >
          <option value="pending">Чакащ</option>
          <option value="approved">Одобрен</option>
          <option value="active">Активен</option>
          <option value="completed">Завършен</option>
          <option value="rejected">Отхвърлен</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Бележки
        </label>
        <textarea
          value={formData.notes || ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 h-11 rounded-lg border border-[#D2D2D7] text-[#1D1D1F] text-[15px] font-medium hover:bg-[#F5F5F7] transition-all"
        >
          Отказ
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 h-11 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[15px] font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Запазване...</span>
            </>
          ) : (
            "Запази"
          )}
        </button>
      </div>
    </form>
  );
}
