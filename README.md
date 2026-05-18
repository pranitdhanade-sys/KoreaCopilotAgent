# M365 Agent Templates

업무 자동화와 생산성 향상을 위한 **M365 에이전트 / 프롬프트 / Copilot 스킬 / 교육 코스** 템플릿 허브의 공식 웹사이트 저장소입니다.

🌐 **사이트:** https://microsoft.github.io/KoreaCopilotAgent/

---

## 📦 구성

| 파일 / 폴더 | 설명 |
| --- | --- |
| [`index.html`](index.html) | 랜딩 페이지 마크업 (Hero + 템플릿 카탈로그 + 피드백 카드) |
| [`styles.css`](styles.css) | 라이트 테마 디자인 시스템 / 반응형 스타일 |
| [`script.js`](script.js) | 카테고리 필터·검색·모바일 내비게이션 |
| [`images/`](images/) | 3D 일러스트 / 카드 아이콘 PNG (직접 채워 넣음) |
| [`IMAGE_PROMPTS.md`](IMAGE_PROMPTS.md) | ChatGPT 이미지 생성용 프롬프트 모음 |
| `.nojekyll` | GitHub Pages에서 Jekyll 처리 비활성화 |
| `.github/workflows/pages.yml` | `main` 브랜치 푸시 시 자동 배포 |

## 🎨 디자인 리소스 채우기

`images/` 폴더가 비어 있다면 카드의 아이콘 자리에 이모지가 자동으로 표시됩니다 (`onerror` 폴백). 실제 3D 일러스트를 사용하려면:

1. [`IMAGE_PROMPTS.md`](IMAGE_PROMPTS.md) 의 프롬프트를 ChatGPT(이미지 생성 가능한 모델)에 그대로 입력합니다.
2. 생성된 PNG를 **투명 배경 정사각형** 으로 저장합니다.
3. [`images/.gitkeep`](images/.gitkeep) 에 명시된 **정확한 파일명** 으로 `images/` 폴더에 넣습니다.
4. 페이지를 새로 고치면 이모지 폴백이 사라지고 일러스트가 표시됩니다.

> 폴백 동작 덕분에 디자인 리소스를 한 번에 모두 채울 필요는 없습니다. 채워진 파일부터 순차적으로 적용됩니다.

## 🧭 템플릿 항목 추가/수정

[`index.html`](index.html) 의 `<!-- Templates -->` 섹션을 보면 `template-card` 가 1번부터 10번까지 나열되어 있습니다. 각 카드는 다음 데이터를 포함합니다:

```html
<article class="template-card" data-type="agent | prompt | skill | course">
  <div class="template-icon">
    <img src="images/icon-XX-name.png" alt="" onerror="…이모지 폴백…">
  </div>
  <div class="template-body">
    <div class="template-head">
      <h3>1. 제목</h3>
      <span class="tag" data-tag="agent | prompt | skill | course">Declarative Agent</span>
    </div>
    <p class="template-desc">설명</p>
    <!-- 다운로드 버튼들 -->
  </div>
</article>
```

- `data-type` 값으로 상단 필터 탭과 검색이 동작합니다.
- `data-tag` 값에 따라 우상단 배지 색상이 결정됩니다 (`styles.css` 의 `.tag[data-tag="..."]`).

## 🚀 GitHub Pages 배포

1. GitHub 저장소의 **Settings → Pages** 로 이동합니다.
2. **Build and deployment > Source** 를 **GitHub Actions** 로 변경합니다.
3. `main` 브랜치에 푸시하면 [`pages.yml`](.github/workflows/pages.yml) 워크플로우가 자동으로 실행됩니다.
4. 배포가 완료되면 `https://microsoft.github.io/KoreaCopilotAgent/` 에서 확인할 수 있습니다.

## 🖥️ 로컬에서 미리보기

별도의 빌드 도구가 필요 없는 정적 파일입니다.

### Python (가장 간단)

```bash
python -m http.server 8080
```

### Node.js

```bash
npx serve .
```

### VS Code 확장

[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 확장을 설치하고 `index.html` 에서 우클릭 → **Open with Live Server**.

이후 브라우저에서 [http://localhost:8080](http://localhost:8080) 을 엽니다.

## ✏️ 톤 & 컬러 변경

[`styles.css`](styles.css) 상단의 `:root` CSS 변수만 수정해도 전체 톤이 바뀝니다.

| 변수 | 용도 |
| --- | --- |
| `--blue`, `--blue-2` | 헤드라인 "M365" 그라데이션 / 포커스 컬러 |
| `--purple`, `--pink` | "모든 파일 다운로드" CTA 그라데이션 |
| `--tag-*-bg / --tag-*-fg` | 카드 배지 색상 |
| `--card-pink / --card-yellow / --card-blue` | 하단 피드백 카드 파스텔 배경 |

## 📄 라이선스

이 저장소의 코드는 MIT 라이선스를 따릅니다.
