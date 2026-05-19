# 강지은 · AI Engineer Portfolio

> 데이터의 가치를 구현하는 AI 엔지니어 — 6년차의 production AI 시스템 케이스 스터디.

🌐 **Live**: [my-portfolio-eight-blush-57.vercel.app](https://my-portfolio-eight-blush-57.vercel.app)

---

## 무엇이 들어있나

| 섹션 | 내용 |
|---|---|
| **Hero** | 한 줄 소개 + 상태(currently shipping) + 6년차 / 5+ 프로젝트 / 논문 2편 |
| **About** | 4대 핵심역량 — LLM/RAG · Python 백엔드 · AWS Serverless · Computer Vision |
| **Experience** | 5개 회사 타임라인 (페르소나에이아이·아이티센·뉴로코어·진학사·자이플래닛) |
| **Projects** | 5개 case study — NeuroCore RAG Agent, 현대캐피탈 AI Playground, KB증권 RAG, 진학사 OCR, 자이플래닛 치과 영상 AI |
| **Side Projects** | my-arxiv (논문 피드 + 한국어 요약), 노포지도 (서울 노포 705곳) |
| **Publications** | 국제 학술지 2편 (BMC Oral Health 2023, DMFR 2023) |
| **Skills** | AI/ML · Vision/NLP · Backend/Data · Cloud/MLOps 알파벳순 정렬 |
| **Background** | 학력 · 자격증 · 교육수료 |

---

## 기술 스택

```
Framework       Next.js 16 (App Router, Turbopack)
Styling         Tailwind v4
Content         Markdown + gray-matter + react-markdown
Fonts           Geist Sans / Mono
Icons           Lucide
Deploy          Vercel
Repository      GitHub (this repo)
```

## 구조

```
.
├── app/
│   ├── layout.tsx            # metadata + 폰트
│   ├── page.tsx              # 단일 페이지 (Hero ~ Contact)
│   ├── opengraph-image.tsx   # 동적 OG 이미지 (Edge runtime, Noto Sans KR 동적 로딩)
│   ├── twitter-image.tsx
│   └── projects/[slug]/      # 케이스 스터디 상세 페이지
├── components/
│   ├── site-header.tsx       # sticky 헤더 + 앵커 네비
│   └── project-card.tsx
├── content/
│   └── case-studies/         # 케이스 스터디 markdown (frontmatter + 본문)
├── lib/
│   ├── profile.ts            # 이름·skills·experience·publications·사이드 단일 출처
│   ├── case-studies.ts       # markdown 로더 (최신순 정렬)
│   └── utils.ts
└── public/
    └── sideprojects/         # 사이드 프로젝트 스크린샷
```

## 로컬 실행

```bash
npm install
npm run dev
# http://localhost:3000
```

## 새 케이스 스터디 추가하기

1. `content/case-studies/06-newproject.md` 파일을 만들고
2. frontmatter (slug, title, period, stack, ...)를 채우면
3. 자동으로 홈 카드 + 상세 페이지가 생성됨 (`getAllCaseStudies()` 가 디렉토리 스캔)

---

## License

본 portfolio의 소스 코드는 자유롭게 참고 가능하나, **케이스 스터디 본문·이력 정보·논문 정보는 본인 컨텐츠**라 무단 복제·재게시 금지.

## Contact

- Email: [zieun.kang@gmail.com](mailto:zieun.kang@gmail.com)
- GitHub: [@hizieun](https://github.com/hizieun)
