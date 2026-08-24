// Career totals, computed from the Korean experience periods so the numbers
// on the site age by themselves. Nothing here is hand-maintained — editing
// `experience` in profile.ts is enough.
//
// Sums each tenure rather than measuring first-job → today, because there are
// gaps between roles (e.g. 2023.07 → 2024.01) that shouldn't be counted.

type Tenure = { period: string; role: string };

/** "2025.12 – 현재" | "2020.04 – 2022.05" → months worked (end exclusive). */
function tenureMonths(period: string, now: Date): number {
  const [rawStart, rawEnd = ""] = period.split(/[–-]/).map((s) => s.trim());
  const [sy, sm] = rawStart.split(".").map((n) => Number.parseInt(n, 10));
  if (!Number.isFinite(sy)) return 0;

  const ongoing = rawEnd.includes("현재") || rawEnd === "";
  const [ey, em] = ongoing
    ? [now.getFullYear(), now.getMonth() + 1]
    : rawEnd.split(".").map((n) => Number.parseInt(n, 10));
  if (!Number.isFinite(ey)) return 0;

  return Math.max(0, (ey - sy) * 12 + (em - (sm || 1)) + 1);
}

export function computeCareer(tenures: Tenure[], now = new Date()) {
  const months = tenures.reduce((sum, t) => sum + tenureMonths(t.period, now), 0);
  const years = Math.floor(months / 12);
  const rest = months % 12;

  // 년차: Korean convention counts the year you're currently in.
  const nthYear = years + 1;
  const contract = tenures.filter((t) => t.role.includes("프리랜서")).length;

  return {
    months,
    years,
    nthYear,
    contract,
    fullTime: tenures.length - contract,
    ko: rest ? `${years}년 ${rest}개월` : `${years}년`,
    en: rest ? `${years} yrs ${rest} mos` : `${years} yrs`,
  };
}
