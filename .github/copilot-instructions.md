# KoreaCopilotAgent — Copilot/에이전트 작업 지침

이 리포지토리에서 작업할 때 반드시 참고해야 할 규칙과 워크플로우 모음입니다.  
새 세션의 Copilot/코딩 에이전트는 사용자가 별도로 지시하지 않아도 이 문서를 그대로 따르세요.

---

## 1. 프로젝트 개요

- **무엇**: 한국어 사용자를 위한 Microsoft 365 Copilot · Copilot Studio · 에이전트 학습/실습 카탈로그.
- **배포**: GitHub Pages — https://microsoft.github.io/KoreaCopilotAgent/
- **빌드 도구 없음**: 순수 HTML/CSS/JS 정적 사이트. 푸시하면 ~1분 후 Pages가 자동 빌드.
- **브랜치**: `main` (직접 push).

### 디렉터리 핵심

```
index.html                  # 메타 태그, OG, 파비콘, 페이지 골격
styles.css                  # 전체 스타일
script.js                   # 카드 렌더링, 필터, 검색
templates.json              # 매니페스트: 어떤 data/*.json을 어떤 type/tagLabel로 로드할지
data/agents.json            # 에이전트 샘플
data/courses.json           # 교육 과정 (온디맨드/유료/무료)
data/handson.json           # 핸즈온 워크샵
data/prompts.json           # 프롬프트 모음
data/skills.json            # Copilot 스킬
data/plugins.json           # Copilot Cowork 플러그인
images/illustrations/*.png  # 카드 아이콘 (1024×1024 PNG)
images/og-image.png         # 1200×630 Open Graph 카드
images/favicon-32.png       # 파비콘
images/favicon-256.png      # 파비콘
images/hero.png             # 1024×1024 브랜드 일러스트 (OG/파비콘 원본)
templates/<id>/...          # 다운로드 가능한 ZIP/PDF/DOCX 등 자산
```

`script.js`는 `templates.json`을 먼저 읽고, 그 안의 `categories[]`를 따라가며 각 `data/*.json`을 fetch → 모두 머지 → 카드로 렌더합니다.

---

## 2. 카드 데이터 스키마

모든 `data/*.json`은 동일한 구조입니다.

```jsonc
{
  "items": [
    {
      "id": "kebab-case-id",                          // 영문 kebab-case, 짧고 의미 있게
      "title": "한국어 제목",
      "icon": "images/illustrations/<id>.png",        // 1024×1024 PNG 권장
      "fallbackEmoji": "📦",                          // 이미지 로드 실패 시 표시
      "description": "한국어 2~4문장 설명.",
      "downloads": [
        { "label": "메인 사이트 열기", "fileType": "URL", "url": "https://..." },
        { "label": "가이드 (PDF)",     "fileType": "PDF", "url": "templates/<id>/foo.pdf" }
      ],
      "developer": "이수민"                            // (선택) 작성자
    }
  ]
}
```

### `fileType` 규칙 — 매우 중요

| 값 | 동작 | 사용 시점 |
|---|---|---|
| `"URL"` | `target="_blank" rel="noopener"`로 새 탭 오픈, 배지 숨김 | 외부 사이트, GitHub, 유튜브 등 모든 외부 링크 |
| `"ZIP"`/`"PDF"`/`"DOCX"`/`"PPTX"`/`"CSV"` 등 | `download` 속성 + `.<TYPE>` 배지 표시 | 리포지토리 안에 들어 있는 실제 다운로드 자산 |

**외부링크는 반드시 `"fileType": "URL"`** — 누락하면 다운로드 시도되어 깨집니다.

### 다운로드 링크 개수
- 일반적으로 **3~4개**: 메인 사이트 1개 + 주요 섹션/단계 2~3개 + GitHub/원본 1개.
- 핵심 진입점부터 시작해서 깊이 있는 자료로 내려가는 순서.

### 카드 번호 매기기
- 카드 제목 앞 번호는 `script.js`의 `renderTemplates`가 **카테고리별로 1부터** 자동 부여 (`perTypeCount` 카운터).
- 즉 JSON에 명시적 번호를 넣지 않습니다 — `items[]` 배열의 순서가 곧 카드 번호.
- 새 항목은 보통 해당 `data/<category>.json`의 **`items` 배열 끝에 append** → 그 카테고리의 마지막 번호로 들어감.
- 순서를 바꾸려면 배열 위치를 옮기면 됩니다.

### 새 카드 추가 후 확인할 것
- [ ] `images/illustrations/<id>.png`가 존재하는가
- [ ] 외부 URL에 `fileType: "URL"`이 들어가 있는가
- [ ] `description`이 한국어이고 마침표로 끝나는가
- [ ] 같은 `id`가 다른 카테고리에 중복되지 않는가

---

## 3. 카드 일러스트(아이콘) 생성

모든 카드 아이콘은 **1024×1024 PNG**, `images/illustrations/<id>.png`에 저장. ChatGPT 이미지 생성으로 만듭니다.

### 3-1. 표준 프롬프트 템플릿 (영문 그대로 입력)

```
Create a square 1:1 flat 3D icon illustration: <피사체 + 핵심 디테일 1~2개>, suggesting <카드 주제>. Smooth rounded shapes, soft <color A> and <color B> pastel gradient, gentle ambient shadow, pure white background, modern app icon style, centered composition, friendly and minimal. No text, no letters, no numbers, no symbols, no words anywhere in the image. Output as a single high-resolution PNG.
```

**필수 요소:**
- `flat 3D icon illustration` (스타일 일관성)
- `pure white background` (다른 카드와 통일)
- `No text, no letters, no numbers, no symbols, no words` (글자 방지 — 빼면 거의 항상 한글/영문이 박힘)
- `soft pastel gradient` (브랜드 톤)

### 3-2. 색상 팔레트 — 같은 조합 절대 재사용 금지

이미 사용된 조합 (새 카드는 이 목록 밖에서 골라야 합니다):

**handson**
- lime + chartreuse
- turquoise + aqua
- indigo + violet
- magenta + rose pink
- mustard + warm peach

**agents 등 기타**
- mint + sky
- amber + orange
- beige + brown
- coral + peach
- teal + cyan
- periwinkle + lavender
- sage green + cream butter ← `m365-agent-templates` 슬롯

**skills**
- soft blue + periwinkle ← `ai-news-briefing-skill`
- lavender + rose pink ← `daily-work-wrapup-skill`
- seafoam + butter yellow ← `today-wisdom-skill`

**plugins (Copilot Cowork 플러그인)**
- slate blue + lilac ← `telecom-insights-plugin`

**library 아이콘 (재사용 가능 — 카테고리별 다른 카드에서 같은 팔레트 OK)**
- mint + sky ← library: meeting, robot, dashboard, clock, role, image, vector, shield
- coral + peach ← library: email, prompt, teams, star, automation, translate, idea, key
- lavender + rose pink ← library: document, brain, chat, quote, partner, audio, table, fingerprint
- amber + orange ← library: calendar, agent, notification, hourglass, manager, video, fine-tune, lock
- seafoam + butter yellow ← library: checklist, chart-bar, lightbulb, badge, sync, whiteboard
- soft blue + periwinkle ← library: presentation, sparkle, search, graduation, people, gear, schedule, timer
- teal + cyan ← library: clipboard, chip, share, workflow, podcast, filter, vault
- dusty pink + sand ← library: report, chart-pie, book, heart, customer, cycle, sticky-note

> library 아이콘은 `images/library/<category>/<name>.png` 에서 재사용. 카드 전용 일러스트는 여전히 `images/illustrations/<id>.png`.

추천 미사용 후보 (새 카드 전용 일러스트용): `salmon + coral`, `butter yellow + mint`, `apricot + cream`.

> 새 카드를 만든 직후 이 파일의 팔레트 목록에 추가하세요. 그렇지 않으면 다음 세션이 같은 색을 또 씁니다.

### 3-2-A. 라이브러리 먼저 확인

카드를 새로 만들 때는 **먼저 `images/library/index.json` 을 살펴서 딱 맞는 아이콘이 있는지** 확인하세요.
- 있으면 카드의 `icon` 필드를 `images/library/<category>/<name>.png` 로 지정 (전용 일러스트 생성 불필요)
- 없으면 `images/illustrations/<id>.png` 로 새로 만들기

### 3-3. ChatGPT 다운로드 파이프라인 (Playwright 브라우저 자동화 가정)

1. ChatGPT 페이지의 composer(`textbox "Chat with ChatGPT"`)에 위 템플릿 프롬프트 입력 → 전송.
2. **대기 ~30–60초.** 완료 감지: `main img[alt^="Generated image:"]` 카운트가 증가하면 완료.
3. `page.evaluate`로 이미지 URL을 `fetch(url, { credentials: 'include' })` → `arrayBuffer()` → base64 인코딩.
4. 결과 텍스트에 `BEGIN_B64:<base64>:END_B64` 마커를 감싸 반환.
5. PowerShell에서 마커 추출 → `[Convert]::FromBase64String` → `[IO.File]::WriteAllBytes('images/illustrations/<id>.png', $bytes)`.

### 3-4. 실패 시 대응

| 문제 | 처방 |
|---|---|
| 결과에 글자가 박힘 | "No text..." 문구를 다시 강조, `no labels, no captions` 추가하여 재생성 |
| 색이 너무 진하거나 채도 높음 | `soft`, `gentle`, `light pastel` 강조 |
| 배경이 회색/그라데이션 | `pure white background, isolated subject` 명시 |
| ChatGPT 세션 만료 | 사용자에게 새 탭 로그인 안내 후 동일 컨버세이션 URL로 복귀 |

---

## 4. OG 이미지 · 파비콘 · Teams 미리보기

### 사양
- **`images/og-image.png`**: 1200×630 (1.91:1). 정사각형은 Teams unfurl에 부적합.
- **`images/favicon-32.png`**, **`images/favicon-256.png`**: hero.png 리사이즈.

### 생성 방법 (PowerShell `System.Drawing`)
1. `Add-Type -AssemblyName System.Drawing`
2. 1200×630 캔버스 생성, 부드러운 배경 (`#fafbfd` 단색 또는 `LinearGradientBrush`로 `#EEF2FA → #FAFBFD` 가로 그라데이션).
3. `hero.png`를 보통 **560×560** (여백 큰 안전 버전) 또는 **600×600** (큼지막한 버전)으로 중앙 배치.
4. `InterpolationMode = HighQualityBicubic`로 리사이즈 품질 확보.

### `index.html` `<head>` 메타 (변경 금지 항목)
```html
<link rel="icon" type="image/png" sizes="32x32"   href="images/favicon-32.png">
<link rel="icon" type="image/png" sizes="256x256" href="images/favicon-256.png">
<link rel="apple-touch-icon" sizes="256x256" href="images/favicon-256.png">
<meta property="og:image" content="https://microsoft.github.io/KoreaCopilotAgent/images/og-image.png">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

### 캐시 무효화
Teams/Slack/LinkedIn은 unfurl 결과를 캐시합니다. **OG 이미지 갱신 후 반드시 사용자에게 `?v=N` 캐시버스터 안내**:
> "URL 끝에 `?v=2` 같이 붙여서 다시 보내 보세요. Teams가 새 이미지를 가져옵니다."

---

## 5. 커밋 & 배포 컨벤션

- 직접 `main`에 push (보호 규칙 없음).
- 커밋 메시지: 짧은 한국어 또는 영문. 예:
  - `add L400 handson entry`
  - `핸즈온 추가: TicketMaster 에이전트`
  - `fix Teams unfurl with 1200x630 og-image`
- **여러 파일 한 번에 커밋해도 OK** — 일러스트 PNG + JSON 추가를 같은 커밋에.
- push 후 GitHub Pages 빌드 ~1분. 빌드 완료 전에는 캐시버스터를 써도 옛 콘텐츠가 보일 수 있음.

---

## 6. 자주 받는 요청 → 표준 절차

### A. "이 URL을 핸즈온/에이전트/코스에 추가해줘"
1. `fetch_webpage`로 URL 페이지 요약 (제목, 무엇을 배우는지, 단계 구조).
2. 어울리는 카테고리 결정 (`handson` vs `courses` vs `prompts` vs `skills` vs `agents`).
3. **§3.1~3.4** 절차로 일러스트 생성 → `images/illustrations/<id>.png`.
4. 해당 `data/<category>.json`의 `items` 배열 끝에 새 객체 추가.
5. **외부 링크는 모두 `fileType: "URL"`** (§2 표 참고).
6. `git add . && git commit -m "..." && git push`.
7. 사용자에게 라이브 URL + 필요 시 `?v=N` 안내.

### B. "Teams 미리보기가 안 나와요"
1. `images/og-image.png`이 1200×630인지 확인 (`System.Drawing.Image::FromFile`로 가로/세로 출력).
2. `index.html`의 og 메타 태그가 §4의 형태인지 확인.
3. 사용자에게 `?v=N` 캐시버스터로 재시도하도록 안내.
4. 그래도 안 나오면: Microsoft Teams는 LinkedIn Post Inspector 같은 도구가 없으므로 `?v=N+1` 한 번 더 시도.

### C. "아이콘이 너무 작아 보여요"
- OG 카드 안의 hero 크기 변경: PowerShell 스크립트에서 hero 변수의 width/height를 `560 → 600` 또는 `560 → 640`으로 증가.
- 단, 세로가 630이므로 hero 높이가 630을 넘으면 안 됨 (위아래 여유 30~50px 유지).

---

## 7. 자주 받는 함정 (절대 하지 말 것)

- ❌ 외부링크에 `fileType` 누락 → 다운로드 시도되어 깨짐. **반드시 `"URL"`**.
- ❌ 일러스트 프롬프트에서 "No text..." 문구 누락 → 한글/영문이 박힘.
- ❌ 같은 색 팔레트 재사용 → 시각적 구분 손상. §3.2 목록을 갱신·존중.
- ❌ OG 이미지를 1:1 정사각형으로 만들기 → Teams unfurl 깨짐. **1200×630 고정**.
- ❌ `id`를 한글로 → 파일 경로 깨짐. **kebab-case 영문**.
- ❌ `templates/<id>/` 폴더의 파일명에 공백을 그대로 → URL 인코딩 필요. `%20` 사용.
- ❌ `description` 안에 따옴표(`"`)를 그대로 → JSON 파싱 오류. 사용해야 한다면 `\"`로 이스케이프하거나 한국어 따옴표 `"` `"` 사용.
- ❌ 사용자가 만족하지도 않았는데 추가 "개선"을 시도 → 사용자가 `"ㅋㅌ"`/`"OK"`/스크린샷으로 만족 표시하면 즉시 종료.

---

## 8. 메모리 사용 권장

새 세션 시작 시:
1. 이 파일(`.github/copilot-instructions.md`)을 먼저 읽으세요.
2. `/memories/repo/`에 있는 노트도 확인 — 최근 작업의 임시 상태가 있을 수 있습니다.
3. 새 카드 추가 후에는 §3.2의 색상 팔레트 목록을 **이 파일 내에서** 갱신하세요.

---

_마지막 정리: 사용자가 처음 한국어로 카드 추가 요청을 했고, 약 5번의 반복 끝에 OG 미리보기까지 정착시킨 결과를 바탕으로 작성됨._
