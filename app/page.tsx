import Link from "next/link";
import { ArrowRight, Mail, MapPin, ExternalLink, GraduationCap, Award, BookOpen } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.79.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
import { SiteHeader } from "@/components/site-header";
import { ProjectCard } from "@/components/project-card";
import { getAllCaseStudies } from "@/lib/case-studies";
import { profile } from "@/lib/profile";

export default async function Home() {
  const studies = await getAllCaseStudies();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-20 sm:pt-32 pb-16">
          <div className="flex items-center gap-2 text-sm text-muted font-mono mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currently shipping at KB증권</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            {profile.name}
            <span className="block text-muted font-medium text-xl sm:text-3xl mt-3 break-keep">
              {profile.tagline}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-foreground/80 leading-relaxed max-w-2xl mb-10 break-keep">
            {profile.subtagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              프로젝트 보기 <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" /> {profile.email}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl pt-8 border-t border-border">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl sm:text-3xl font-bold tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-muted leading-tight break-keep">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="max-w-5xl mx-auto px-6 py-16 border-t border-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="text-xs font-mono text-muted mb-2">01 / ABOUT</div>
              <h2 className="text-2xl font-bold tracking-tight">About</h2>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {profile.about.map((p, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg leading-relaxed text-foreground/85"
                >
                  {p}
                </p>
              ))}
              <div className="grid sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-border">
                {profile.strengths.map((s) => (
                  <div key={s.label}>
                    <div className="text-sm font-semibold">{s.label}</div>
                    <div className="text-xs text-muted mt-0.5">{s.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="max-w-5xl mx-auto px-6 py-16 border-t border-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="text-xs font-mono text-muted mb-2">
                02 / EXPERIENCE
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
              <p className="text-sm text-muted mt-2">
                총 5년 3개월 · 정규직 3곳, 프리랜서 2곳
              </p>
            </div>
            <div className="lg:col-span-2">
              <ol className="relative border-l border-border space-y-8 pl-6">
                {profile.experience.map((e) => {
                  const isCurrent = e.period.includes("현재");
                  return (
                    <li key={e.company} className="relative">
                      {isCurrent ? (
                        <span
                          aria-label="현재 근무 중"
                          className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse"
                        />
                      ) : (
                        <span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background" />
                      )}
                      <div className="text-xs font-mono text-muted mb-1 flex items-center gap-2 flex-wrap">
                        <span>{e.period}</span>
                        {isCurrent && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold tracking-wide">
                            현재 근무 중
                          </span>
                        )}
                      </div>
                      <div className="text-base font-semibold">
                        {e.company}
                        {e.client && (
                          <span className="text-muted font-normal ml-2">
                            · {e.client}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted">{e.role}</div>
                      <div className="text-sm mt-1 text-foreground/85">
                        {e.highlight}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="max-w-5xl mx-auto px-6 py-16 border-t border-border"
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono text-muted mb-2">
                03 / PROJECTS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Featured Case Studies
              </h2>
              <p className="text-muted mt-2 max-w-xl">
                담당한 프로젝트를 최신순으로 정리했어요. 각 카드 클릭 시 상세 케이스 스터디로 이동합니다.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studies.map((s) => (
              <ProjectCard key={s.frontmatter.slug} study={s} />
            ))}
          </div>
        </section>

        {/* Side Projects */}
        <section
          id="side-projects"
          className="max-w-5xl mx-auto px-6 py-16 border-t border-border"
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono text-muted mb-2">
                04 / SIDE PROJECTS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Building Outside Work
              </h2>
              <p className="text-muted mt-2 max-w-xl">
                업무 외에 직접 만들어 운영 중인 프로젝트.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.sideProjects.map((p) => (
              <div
                key={p.name}
                className="rounded-xl border border-border bg-background overflow-hidden flex flex-col"
              >
                {/* Visual */}
                {p.image ? (
                  <a
                    href={p.live ?? p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video bg-muted-bg overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={`${p.name} screenshot`}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </a>
                ) : (
                  <div
                    className="relative block aspect-video flex items-center justify-center overflow-hidden"
                    style={{
                      background:
                        p.placeholderGradient ?? "var(--muted-bg)",
                    }}
                  >
                    <div className="text-center text-white">
                      <div className="text-6xl mb-3 drop-shadow-lg">
                        {p.placeholderEmoji ?? "✨"}
                      </div>
                      <div className="text-2xl font-bold tracking-tight drop-shadow-md">
                        {p.name.replace(/[\u{1F300}-\u{1FAFF}]/gu, "").trim()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {p.status.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-muted">
                      {p.released}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight mb-1">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted mb-3">{p.tagline}</p>

                  <p className="text-sm leading-relaxed text-foreground/80 mb-4 line-clamp-3">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    {p.highlights.map((h) => (
                      <div
                        key={h}
                        className="text-[10px] text-muted bg-muted-bg rounded px-2 py-1 font-mono leading-tight"
                      >
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.stack.slice(0, 7).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-muted-bg/60 text-muted font-mono"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 7 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-muted font-mono">
                        +{p.stack.length - 7}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-border">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium bg-accent text-accent-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink className="w-3 h-3" /> Live
                      </a>
                    )}
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium border border-border px-3 py-1.5 rounded-md hover:bg-muted-bg transition-colors"
                    >
                      <GithubIcon className="w-3 h-3" /> Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section
          id="publications"
          className="max-w-5xl mx-auto px-6 py-16 border-t border-border"
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono text-muted mb-2">
                05 / PUBLICATIONS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Published Papers
              </h2>
              <p className="text-muted mt-2 max-w-xl">
                국제 학술지에 공동저자로 게재된 의료 영상 AI 연구 논문 2편.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.publications.map((p) => (
              <div
                key={p.url}
                className="rounded-xl border border-border bg-background p-6"
              >
                <div className="text-xs font-mono text-muted mb-2">
                  {p.venue} · {p.date}
                </div>
                <h3 className="text-base font-bold leading-snug tracking-tight mb-3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1.5 hover:text-highlight transition-colors"
                  >
                    <span>{p.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 mt-1 text-muted group-hover:text-highlight shrink-0" />
                  </a>
                </h3>
                <p className="text-sm leading-relaxed text-foreground/75 mb-4">
                  {p.summary}
                </p>
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-border text-xs">
                  <span className="text-muted">{p.role}</span>
                  <Link
                    href={`/projects/${p.caseStudySlug}`}
                    className="font-mono text-highlight hover:underline shrink-0"
                  >
                    Case study →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="max-w-5xl mx-auto px-6 py-16 border-t border-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="text-xs font-mono text-muted mb-2">06 / SKILLS</div>
              <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
              <p className="text-sm text-muted mt-2">
                실제 production 프로젝트에서 운영해본 기술만 정리.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-8">
              {Object.entries(profile.skills).map(([group, items]) => (
                <div key={group}>
                  <div className="text-sm font-semibold mb-3">{group}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-md bg-muted-bg border border-border font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Background */}
        <section
          id="background"
          className="max-w-5xl mx-auto px-6 py-16 border-t border-border"
        >
          <div className="mb-10">
            <div className="text-xs font-mono text-muted mb-2">
              07 / BACKGROUND
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Education & Credentials
            </h2>
            <p className="text-sm text-muted mt-2">
              학력 · 자격증 · 교육 수료.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Education */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                <GraduationCap className="w-4 h-4 text-muted" />
                Education
              </div>
              <ol className="space-y-4">
                {profile.education.map((e) => (
                  <li key={e.school} className="text-sm">
                    <div className="font-medium leading-snug">{e.school}</div>
                    <div className="text-muted text-xs mt-0.5">
                      {e.degree} · {e.status}
                    </div>
                    <div className="text-muted text-xs font-mono mt-0.5">
                      {e.period}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                <Award className="w-4 h-4 text-muted" />
                Certifications
              </div>
              <ol className="space-y-4">
                {profile.certifications.map((c) => (
                  <li key={c.name} className="text-sm">
                    <div className="font-medium leading-snug">{c.name}</div>
                    <div className="text-muted text-xs mt-0.5">{c.issuer}</div>
                    <div className="text-muted text-xs font-mono mt-0.5">
                      {c.date}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Training */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                <BookOpen className="w-4 h-4 text-muted" />
                Training
              </div>
              <ol className="space-y-4">
                {profile.training.map((t) => (
                  <li key={t.name} className="text-sm">
                    <div className="font-medium leading-snug">{t.name}</div>
                    <div className="text-muted text-xs mt-0.5">{t.issuer}</div>
                    <div className="text-muted text-xs font-mono mt-0.5">
                      {t.period}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="max-w-5xl mx-auto px-6 py-20 border-t border-border"
        >
          <div className="text-xs font-mono text-muted mb-2">08 / CONTACT</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            함께 일해요
          </h2>
          <p className="text-lg text-muted max-w-xl mb-8">
            LLM 시스템 구축 · RAG 파이프라인 · AI 제품 개발 — 새로운 기회와 협업 제안을 환영합니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 rounded-lg font-medium hover:bg-muted-bg transition-colors"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <span className="inline-flex items-center gap-2 px-2 py-3 text-muted">
              <MapPin className="w-4 h-4" /> {profile.location}
            </span>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <span>
            © {new Date().getFullYear()} {profile.name} ({profile.nameEn}). All rights reserved.
          </span>
          <span className="font-mono text-xs">Built with Next.js · Tailwind</span>
        </div>
      </footer>
    </>
  );
}
