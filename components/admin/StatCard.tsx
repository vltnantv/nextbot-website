"use client";

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  trend?: string;
  trendUp?: boolean;
  sparklineData?: number[];
}

export function StatCard({
  icon,
  value,
  label,
  trend,
  trendUp,
  sparklineData,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E5EA] p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0071E3]/10 to-[#06B6D4]/10 flex items-center justify-center mb-4">
        <span className="text-[20px]">{icon}</span>
      </div>

      {/* Value */}
      <div className="mb-2">
        <p className="text-[28px] font-bold text-[#1D1D1F] leading-none">
          {value}
        </p>
      </div>

      {/* Label */}
      <p className="text-[13px] text-[#6E6E73] mb-3">{label}</p>

      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-1">
          <span
            className={`text-[11px] font-semibold ${
              trendUp ? "text-[#34C759]" : "text-[#FF3B30]"
            }`}
          >
            {trendUp ? "↗" : "↘"} {trend}
          </span>
        </div>
      )}

      {/* Sparkline */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-4 h-8">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 32"
            preserveAspectRatio="none"
            className="text-[#0071E3]"
          >
            <polyline
              points={sparklineData
                .map((value, i) => {
                  const x = (i / (sparklineData.length - 1)) * 100;
                  const max = Math.max(...sparklineData);
                  const min = Math.min(...sparklineData);
                  const range = max - min || 1;
                  const y = 32 - ((value - min) / range) * 28;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
