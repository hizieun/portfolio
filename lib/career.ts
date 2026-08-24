// Career totals, computed from the Korean experience periods so the numbers
// on the site age by themselves. Nothing here is hand-maintained — editing
// `experience` in profile.ts is enough.
//
// Two different readings, both used:
// - `months`/`ko`  = sum of tenures, gaps excluded. Matches how Korean
//   résumés state 총 경력, and feeds 년차.
// - `spanYears`    = first job → today, gaps included. What "N+ years of
//   experience" conventionally means on an English résumé.

type Tenure = { period: string; role: string };

/** "2025.12" → absolute month index. NaN when unparseable. */
function toMonthIndex(ym: string): number {
  const [y, m] = ym.split(".").map((n) => Number.parseInt(n, 10));
  return Number.isFinite(y) ? y * 12 + (Number.isFinite(m) ? m : 1) : Number.NaN;
}

/** "2025.12 – 현재" | "2020.04 – 2022.05" → [startIdx, endIdx] (inclusive). */
function parsePeriod(period: string, now: Date): [number, number] {
  const [rawStart, rawEnd = ""] = period.split(/[–-]/).map((s) => s.trim());
  const start = toMonthIndex(rawStart);
  const ongoing = rawEnd.includes("현재") || rawEnd === "";
  const end = ongoing
    ? now.getFullYear() * 12 + (now.getMonth() + 1)
    : toMonthIndex(rawEnd);
  return [start, end];
}

export function computeCareer(tenures: Tenure[], now = new Date()) {
  const ranges = tenures
    .map((t) => parsePeriod(t.period, now))
    .filter(([s, e]) => Number.isFinite(s) && Number.isFinite(e));

  // inclusive month count — "2020.04 – 2022.05" is 26 months, matching how
  // these tenures are stated on the résumé itself
  const months = ranges.reduce((sum, [s, e]) => sum + Math.max(0, e - s + 1), 0);
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const firstStart = Math.min(...ranges.map(([s]) => s));
  const nowIdx = now.getFullYear() * 12 + (now.getMonth() + 1);
  const spanMonths = Math.max(0, nowIdx - firstStart + 1);

  const contract = tenures.filter((t) => t.role.includes("프리랜서")).length;

  return {
    months,
    years,
    /** 년차: Korean convention counts the year you're currently in. */
    nthYear: years + 1,
    /** Whole years since the first job, gaps included — for "6+ yrs". */
    spanYears: Math.floor(spanMonths / 12),
    contract,
    fullTime: tenures.length - contract,
    ko: rest ? `${years}년 ${rest}개월` : `${years}년`,
    en: rest ? `${years} yrs ${rest} mos` : `${years} yrs`,
  };
}
