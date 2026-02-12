"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminStore } from "@/lib/admin-store";
import { Modal } from "@/components/admin/Modal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import type { Lead } from "@/lib/admin-types";

type StatusFilter = "all" | Lead["status"];
type IndustryFilter = "all" | Lead["industry"];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [industryFilter, setIndustryFilter] = useState<IndustryFilter>("all");
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null,
  );

  // Load leads
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    setLeads(adminStore.getLeads());
  };

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      // Industry filter
      const matchesIndustry =
        industryFilter === "all" || lead.industry === industryFilter;

      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [leads, searchQuery, statusFilter, industryFilter]);

  // Status counts
  const statusCounts = useMemo(() => {
    return {
      new: leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      demo: leads.filter((l) => l.status === "demo").length,
      pilot: leads.filter((l) => l.status === "pilot").length,
      client: leads.filter((l) => l.status === "client").length,
    };
  }, [leads]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingLeadId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingLeadId) {
      adminStore.deleteLead(deletingLeadId);
      loadLeads();
      showToast("Lead изтрит успешно", "success");
      setDeletingLeadId(null);
    }
  };

  const handleExportCSV = () => {
    adminStore.exportToCSV(
      filteredLeads,
      `leads_${new Date().toISOString().split("T")[0]}`,
    );
    showToast("CSV файлът е изтеглен", "success");
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map((l) => l.id)));
    }
  };

  const toggleSelectLead = (id: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLeads(newSelected);
  };

  const handleBulkDelete = () => {
    selectedLeads.forEach((id) => adminStore.deleteLead(id));
    loadLeads();
    setSelectedLeads(new Set());
    showToast(`${selectedLeads.size} leads изтрити`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#1D1D1F]">
            Leads & Клиенти
          </h1>
          <p className="text-[13px] text-[#6E6E73] mt-1">
            Управление на всички leads и клиенти
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Търси..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-60 h-10 pl-10 pr-4 rounded-lg border border-[#D2D2D7] text-[13px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6E73]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Industry Filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value as IndustryFilter)}
            className="h-10 px-4 rounded-lg border border-[#D2D2D7] text-[13px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 transition-all"
          >
            <option value="all">Всички индустрии</option>
            <option value="hotel">Хотелиерство</option>
            <option value="ecommerce">Е-търговия</option>
            <option value="callcenter">Кол Центрове</option>
            <option value="other">Друго</option>
          </select>

          {/* Add Lead Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="h-10 px-4 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-semibold transition-all active:scale-[0.98] flex items-center gap-2"
          >
            <span>➕</span>
            <span>Нов Lead</span>
          </button>
        </div>
      </div>

      {/* Status Stats */}
      <div className="flex gap-3">
        {([
          { key: "all", label: "Всички", count: leads.length },
          { key: "new", label: "Нови", count: statusCounts.new },
          { key: "contacted", label: "Контакт", count: statusCounts.contacted },
          { key: "demo", label: "Демо", count: statusCounts.demo },
          { key: "pilot", label: "Пилот", count: statusCounts.pilot },
          { key: "client", label: "Клиент", count: statusCounts.client },
        ] as const).map((stat) => (
          <button
            key={stat.key}
            onClick={() => setStatusFilter(stat.key as StatusFilter)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg border transition-all
              ${
                statusFilter === stat.key
                  ? "border-[#0071E3] bg-[#0071E3]/5 text-[#0071E3]"
                  : "border-[#E5E5EA] bg-white text-[#6E6E73] hover:border-[#D2D2D7]"
              }
            `}
          >
            <span className="text-[17px] font-bold">{stat.count}</span>
            <span className="text-[13px] font-medium">{stat.label}</span>
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedLeads.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-[#0071E3]/10 border border-[#0071E3]/20 rounded-lg"
          >
            <span className="text-[13px] font-semibold text-[#0071E3]">
              {selectedLeads.size} избрани
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-lg bg-[#FF3B30] hover:bg-[#FF4540] text-white text-[13px] font-medium transition-all"
            >
              Изтрий избраните
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-medium transition-all"
            >
              Експорт CSV
            </button>
            <button
              onClick={() => setSelectedLeads(new Set())}
              className="ml-auto text-[13px] text-[#6E6E73] hover:text-[#1D1D1F]"
            >
              Отказ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E5EA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F7] border-b border-[#E5E5EA] sticky top-0">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      filteredLeads.length > 0 &&
                      selectedLeads.size === filteredLeads.length
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-[#D2D2D7] text-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20"
                  />
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                  Контакт
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                  Индустрия
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                  Статус
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                  Стойност
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                  Последен контакт
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  index={index}
                  isSelected={selectedLeads.has(lead.id)}
                  onToggleSelect={() => toggleSelectLead(lead.id)}
                  onEdit={() => handleEdit(lead)}
                  onDelete={() => handleDelete(lead.id)}
                  onStatusChange={(status) => {
                    adminStore.updateLeadStatus(lead.id, status);
                    loadLeads();
                    showToast("Статус обновен", "success");
                  }}
                />
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[15px] text-[#6E6E73] mb-2">
                Няма намерени leads
              </p>
              <p className="text-[13px] text-[#8E8E93]">
                Опитайте да промените филтрите
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Нов Lead"
        size="md"
      >
        <LeadForm
          onSave={(lead) => {
            adminStore.saveLead(lead);
            loadLeads();
            setIsAddModalOpen(false);
            showToast("Lead създаден успешно", "success");
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Lead Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingLead(null);
        }}
        title="Редактирай Lead"
        size="md"
      >
        {editingLead && (
          <LeadForm
            initialLead={editingLead}
            onSave={(lead) => {
              adminStore.saveLead(lead);
              loadLeads();
              setIsEditModalOpen(false);
              setEditingLead(null);
              showToast("Lead обновен успешно", "success");
            }}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingLead(null);
            }}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeletingLeadId(null);
        }}
        onConfirm={confirmDelete}
        title="Изтриване на Lead"
        message="Тази операция е необратима. Lead-ът ще бъде изтрит окончателно."
        confirmLabel="Изтрий"
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
// LEAD ROW COMPONENT
// ═══════════════════════════════════════════════════════════

function LeadRow({
  lead,
  index,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  lead: Lead;
  index: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Lead["status"]) => void;
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusBadges = {
    new: { bg: "bg-[#6E6E73]", text: "text-white", label: "Нов" },
    contacted: {
      bg: "bg-[#0071E3]",
      text: "text-white",
      label: "Контакт",
    },
    demo: { bg: "bg-[#FF9500]", text: "text-white", label: "Демо" },
    pilot: { bg: "bg-[#06B6D4]", text: "text-white", label: "Пилот" },
    client: { bg: "bg-[#34C759]", text: "text-white", label: "Клиент" },
    lost: { bg: "bg-[#FF3B30]", text: "text-white", label: "Загубен" },
  };

  const industryLabels = {
    hotel: "Хотел",
    ecommerce: "E-commerce",
    callcenter: "Кол център",
    other: "Друго",
  };

  const badge = statusBadges[lead.status];

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        border-b border-[#E5E5EA] transition-colors
        ${index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
        hover:bg-[#F5F5F7]
      `}
    >
      {/* Checkbox */}
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 rounded border-[#D2D2D7] text-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20"
        />
      </td>

      {/* Contact */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0071E3] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
            <span className="text-[13px] font-semibold text-white">
              {lead.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1D1D1F]">
              {lead.name}
            </p>
            <p className="text-[11px] text-[#6E6E73]">{lead.company}</p>
          </div>
        </div>
      </td>

      {/* Industry */}
      <td className="px-4 py-4">
        <span className="inline-block px-2 py-1 rounded-md bg-[#F5F5F7] text-[11px] font-medium text-[#1D1D1F]">
          {industryLabels[lead.industry]}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-4 relative">
        <button
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className={`
            inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold
            ${badge.bg} ${badge.text}
          `}
        >
          {badge.label}
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showStatusMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowStatusMenu(false)}
            />
            <div className="absolute left-0 top-full mt-1 z-20 bg-white rounded-lg shadow-lg border border-[#E5E5EA] py-1 min-w-[120px]">
              {(Object.keys(statusBadges) as Lead["status"][]).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => {
                      onStatusChange(status);
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-[13px] text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                  >
                    {statusBadges[status].label}
                  </button>
                ),
              )}
            </div>
          </>
        )}
      </td>

      {/* Score */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-[#E5E5EA] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF3B30] via-[#FF9500] to-[#34C759]"
              style={{ width: `${lead.score}%` }}
            />
          </div>
          <span className="text-[13px] font-bold text-[#1D1D1F] w-8 text-right">
            {lead.score}
          </span>
        </div>
      </td>

      {/* Monthly Value */}
      <td className="px-4 py-4">
        <span className="text-[13px] font-semibold text-[#1D1D1F]">
          {lead.monthlyValue} лв
        </span>
        <span className="text-[11px] text-[#6E6E73]">/мес</span>
      </td>

      {/* Last Contact */}
      <td className="px-4 py-4">
        <span className="text-[13px] text-[#6E6E73]">
          {getRelativeTime(lead.updatedAt)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-[#0071E3]/10 text-[#0071E3] transition-colors"
            title="Редактирай"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-[#FF3B30]/10 text-[#FF3B30] transition-colors"
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
        </div>
      </td>
    </motion.tr>
  );
}

// ═══════════════════════════════════════════════════════════
// LEAD FORM COMPONENT
// ═══════════════════════════════════════════════════════════

function LeadForm({
  initialLead,
  onSave,
  onCancel,
}: {
  initialLead?: Lead;
  onSave: (lead: Lead) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Lead>>(
    initialLead || {
      name: "",
      email: "",
      phone: "",
      company: "",
      industry: "hotel",
      status: "new",
      score: 50,
      notes: "",
      source: "website",
      assignedAddOns: [],
      monthlyValue: 299,
    },
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Име е задължително";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email е задължителен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невалиден email формат";
    }
    if (!formData.company?.trim()) {
      newErrors.company = "Компания е задължителна";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const lead: Lead = {
      id: initialLead?.id || adminStore.generateId(),
      name: formData.name!,
      email: formData.email!,
      phone: formData.phone || "",
      company: formData.company!,
      industry: formData.industry as Lead["industry"],
      status: formData.status as Lead["status"],
      score: formData.score!,
      notes: formData.notes || "",
      createdAt: initialLead?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: formData.source as Lead["source"],
      assignedAddOns: formData.assignedAddOns || [],
      monthlyValue: formData.monthlyValue!,
    };

    onSave(lead);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Име *
        </label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full h-11 px-4 rounded-lg border ${errors.name ? "border-[#FF3B30]" : "border-[#D2D2D7]"} text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20`}
        />
        {errors.name && (
          <p className="mt-1 text-[11px] text-[#FF3B30]">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Email *
        </label>
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full h-11 px-4 rounded-lg border ${errors.email ? "border-[#FF3B30]" : "border-[#D2D2D7]"} text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20`}
        />
        {errors.email && (
          <p className="mt-1 text-[11px] text-[#FF3B30]">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Телефон
        </label>
        <input
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Компания *
        </label>
        <input
          type="text"
          value={formData.company || ""}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          className={`w-full h-11 px-4 rounded-lg border ${errors.company ? "border-[#FF3B30]" : "border-[#D2D2D7]"} text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20`}
        />
        {errors.company && (
          <p className="mt-1 text-[11px] text-[#FF3B30]">{errors.company}</p>
        )}
      </div>

      {/* Industry & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
            Индустрия *
          </label>
          <select
            value={formData.industry || "hotel"}
            onChange={(e) =>
              setFormData({
                ...formData,
                industry: e.target.value as Lead["industry"],
              })
            }
            className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
          >
            <option value="hotel">Хотелиерство</option>
            <option value="ecommerce">Е-търговия</option>
            <option value="callcenter">Кол Центрове</option>
            <option value="other">Друго</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
            Статус
          </label>
          <select
            value={formData.status || "new"}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as Lead["status"],
              })
            }
            className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
          >
            <option value="new">Нов</option>
            <option value="contacted">Контакт</option>
            <option value="demo">Демо</option>
            <option value="pilot">Пилот</option>
            <option value="client">Клиент</option>
            <option value="lost">Загубен</option>
          </select>
        </div>
      </div>

      {/* Score & Monthly Value */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
            Score: {formData.score}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.score || 50}
            onChange={(e) =>
              setFormData({ ...formData, score: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-[#E5E5EA] rounded-lg appearance-none cursor-pointer accent-[#0071E3]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
            Месечна стойност (лв)
          </label>
          <input
            type="number"
            min="0"
            value={formData.monthlyValue || 299}
            onChange={(e) =>
              setFormData({
                ...formData,
                monthlyValue: parseInt(e.target.value),
              })
            }
            className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
          />
        </div>
      </div>

      {/* Source */}
      <div>
        <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wide mb-2">
          Източник
        </label>
        <select
          value={formData.source || "website"}
          onChange={(e) =>
            setFormData({
              ...formData,
              source: e.target.value as Lead["source"],
            })
          }
          className="w-full h-11 px-4 rounded-lg border border-[#D2D2D7] text-[15px] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
        >
          <option value="website">Website</option>
          <option value="phone">Phone</option>
          <option value="referral">Referral</option>
          <option value="email">Email</option>
          <option value="linkedin">LinkedIn</option>
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

function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = now.getTime() - time.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "току-що";
  if (minutes < 60) return `преди ${minutes} мин`;
  if (hours < 24) return `преди ${hours} ${hours === 1 ? "час" : "часа"}`;
  if (days < 7) return `преди ${days} ${days === 1 ? "ден" : "дни"}`;
  return time.toLocaleDateString("bg-BG");
}
