# Korea Copilot Agent

한국어 환경을 위한 GitHub Copilot 에이전트 프로젝트의 공식 웹사이트 저장소입니다.

🌐 **사이트:** https://microsoft.github.io/KoreaCopilotAgent/

---

## 📦 구성

| 파일 | 설명 |
| --- | --- |
| `index.html` | 랜딩 페이지 마크업 |
| `styles.css` | 디자인 시스템 / 반응형 스타일 |
| `script.js` | 모바일 내비게이션 등 인터랙션 |
| `.nojekyll` | GitHub Pages에서 Jekyll 처리 비활성화 |
| `.github/workflows/pages.yml` | `main` 브랜치 푸시 시 자동 배포 |

## 🚀 GitHub Pages 배포 활성화

1. GitHub 저장소의 **Settings → Pages** 로 이동합니다.
2. **Build and deployment > Source** 를 **GitHub Actions** 로 변경합니다.
3. `main` 브랜치에 푸시하면 [`pages.yml`](.github/workflows/pages.yml) 워크플로우가 자동으로 실행되어 사이트가 배포됩니다.
4. 배포가 완료되면 `https://microsoft.github.io/KoreaCopilotAgent/` 에서 확인할 수 있습니다.

> 처음 한 번은 Settings → Pages 화면에서 환경(`github-pages`)을 승인해야 할 수 있습니다.

## 🖥️ 로컬에서 미리보기

별도의 빌드 도구 없이 정적 파일이므로, 아래 중 한 가지 방법으로 띄울 수 있습니다.

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

## ✏️ 내용 수정하기

- **문구/섹션 변경**: [`index.html`](index.html) 에서 직접 텍스트를 수정합니다. 각 섹션은 `<!-- Hero -->`, `<!-- Features -->` 처럼 주석으로 구분돼 있습니다.
- **색상/타이포그래피**: [`styles.css`](styles.css) 상단의 `:root` CSS 변수 (`--primary`, `--bg`, `--text` 등) 만 바꿔도 전체 톤이 바뀝니다.
- **메뉴 동작**: [`script.js`](script.js) 에서 모바일 내비게이션 토글 로직을 확인할 수 있습니다.

## 📄 라이선스

이 저장소의 코드는 MIT 라이선스를 따릅니다. (LICENSE 파일이 아직 없다면 별도로 추가해 주세요.)
