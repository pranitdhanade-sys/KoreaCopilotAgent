# 🎨 ChatGPT 이미지 생성 프롬프트 가이드

목업의 3D 일러스트 톤을 그대로 살리기 위해 만든 프롬프트 모음입니다.
**ChatGPT 웹사이트**(이미지 생성 가능한 모델: GPT-4o image / DALL·E 3 기반)에 그대로 복사·붙여넣기 하시면 됩니다.

---

## 📐 공통 가이드라인 (모든 이미지에 공통 적용)

모든 카드 아이콘은 톤이 일관돼야 카탈로그가 깔끔해 보입니다. 각 프롬프트 끝에 자동으로 포함돼 있지만, 직접 수정하실 때 참고하세요.

- **스타일**: soft 3D claymorphism / Microsoft Fluent 3D emoji 스타일
- **렌더링**: matte plastic / soft clay 재질, 부드러운 그림자(soft shadow), 가벼운 글로벌 일루미네이션
- **배경**: 완전 투명 (transparent PNG)
- **구도**: 단일 아이콘이 정중앙, 약간 위에서 내려다보는 3/4 뷰
- **비율**: 정사각형 1:1 (1024×1024 권장)
- **색감**: 파스텔 + 비비드 액센트 조합, 채도 너무 높지 않게
- **금지**: 텍스트/숫자/배경 그라데이션 박스/실사풍/사진

---

## 🖼️ 1. Hero 일러스트 → `images/hero.png`

```text
A friendly 3D illustration of two people collaborating with an AI assistant.
On the left, a woman with a purple sweater is smiling and pointing at a floating
holographic chart. In the center stands a cute round robot with a blue glowing
face shield and a small wave. On the right, a man in a dark blue sweater is
working on a silver laptop. Floating around them are pastel UI elements:
a calendar card with a checkmark, a small bar chart, a chat bubble, and a few
small clouds. Soft Microsoft Fluent 3D / claymorphism style, matte plastic
material, soft global illumination, light pastel color palette (lavender, sky
blue, mint, cream). Square 1:1 composition, centered, transparent background,
no text, no logos, no shadow plate.
```

**저장 파일명**: `images/hero.png`

---

## 🎴 카드 아이콘 10종

> 💡 팁: 카드 톤을 통일하려면 한 번의 채팅에서 1번 아이콘을 만든 뒤, 같은 채팅 안에서
> *"같은 스타일로 다음 아이콘 만들어줘: …"* 처럼 이어가는 것을 추천합니다.

### 1. 회의록 작성 도우미 → `images/icon-01-calendar.png`

```text
A 3D calendar icon in Microsoft Fluent / claymorphism style. The calendar has a
white body with rounded corners, a lavender top band, two small purple binder
rings on top, a soft purple grid of date cells, and a large mint-green
checkmark badge in the bottom-right corner. Matte plastic material, soft
shadows, 3/4 view from slightly above. Centered, square 1:1, transparent
background, no text or numbers visible.
```

### 2. 영업 제안서 생성기 → `images/icon-02-briefcase.png`

```text
A 3D business briefcase icon in Microsoft Fluent / claymorphism style. Body in
saturated purple-violet with rounded edges, a yellow-gold handle on top, two
small metallic clasps, and a subtle horizontal divider line on the front.
Matte plastic material, soft shadow, 3/4 view from slightly above. Centered,
square 1:1, transparent background, no text or logos.
```

### 3. 법무 계약서 검토 에이전트 → `images/icon-03-gavel.png`

```text
A 3D judge's gavel icon in Microsoft Fluent / claymorphism style. Wooden mallet
in warm caramel-brown with a soft matte finish, a darker brown handle wrapped
around a creamy round striking block beneath it. Soft drop shadow, 3/4 view
from slightly above, gentle ambient light. Centered, square 1:1, transparent
background, no text or letters.
```

### 4. 고객 응대 스크립트 봇 → `images/icon-04-headset.png`

```text
A 3D over-ear headset icon with a microphone, in Microsoft Fluent /
claymorphism style. Cool blue headband and ear cups in matte plastic, dark
navy ear cushions, a thin gray microphone boom extending forward with a small
mint-green tip. 3/4 view from slightly above, soft shadow, centered. Square
1:1, transparent background, no text or logos.
```

### 5. 임원 보고용 요약 프롬프트 → `images/icon-05-document.png`

```text
A 3D document icon in Microsoft Fluent / claymorphism style. Purple-violet
sheet of paper with a slightly folded top-right corner, three white horizontal
lines on the front representing text, and a subtle highlight on the top edge.
Matte plastic material, soft drop shadow, 3/4 view from slightly above.
Centered, square 1:1, transparent background, no readable text.
```

### 6. 데이터 분석 프롬프트 팩 → `images/icon-06-chart.png`

```text
A 3D bar chart icon in Microsoft Fluent / claymorphism style. Four standing
rounded bars on a light gray base plate: a tall blue bar, a yellow-orange
medium bar, a coral-pink short bar, and a teal-cyan tallest bar at the back.
Matte plastic material, soft shadows, 3/4 view from slightly above. Centered,
square 1:1, transparent background, no axis labels, no numbers.
```

### 7. Copilot 일정 관리 스킬 → `images/icon-07-gear.png`

```text
A 3D mechanical gear / cog icon in Microsoft Fluent / claymorphism style.
Vibrant azure-blue color with eight rounded teeth, a thick outer ring, and a
darker blue circular center hub with a small lighter highlight on top. Matte
plastic material, soft drop shadow, 3/4 view from slightly above. Centered,
square 1:1, transparent background, no text.
```

### 8. 한국어 이메일 톤 매니저 스킬 → `images/icon-08-mail.png`

```text
A 3D mail envelope icon in Microsoft Fluent / claymorphism style. Soft sky-blue
envelope with rounded corners, a subtle triangular flap on top, a slightly
lighter blue inner liner peeking out. Matte plastic material, soft drop shadow,
3/4 view from slightly above, centered. Square 1:1, transparent background, no
text, stamps, or postmarks.
```

### 9. M365 Copilot 도입 교육 (2시간) → `images/icon-09-grad-cap.png`

```text
A 3D graduation cap icon in Microsoft Fluent / claymorphism style. Deep
indigo-purple square mortarboard tilted in 3/4 view, a softer purple rounded
hat base underneath, and a single gold tassel hanging from the top-right corner.
Matte plastic material, soft drop shadow, centered. Square 1:1, transparent
background, no text, no letters.
```

### 10. Copilot Studio 실전 워크숍 → `images/icon-10-lightbulb.png`

```text
A 3D glowing light bulb icon in Microsoft Fluent / claymorphism style. Warm
golden-yellow bulb with a soft inner glow, a smooth glass-like matte finish, a
small light highlight on the upper left, and a chunky metallic gray base /
screw cap. Soft drop shadow, 3/4 view from slightly above, centered. Square
1:1, transparent background, no text.
```

---

## 🧰 후처리 팁

- **배경 제거**: ChatGPT가 흰 배경으로 출력했다면 [remove.bg](https://www.remove.bg/) 또는 Photoshop / Affinity로 배경을 알파로 빼주세요. (혹은 프롬프트 끝에 *"on a pure white #ffffff background"* 라고 명시한 뒤, 일괄 처리하셔도 됩니다.)
- **크기 표준화**: 모든 아이콘을 같은 캔버스 비율로 정렬해 두면 카탈로그 정렬이 깔끔합니다. 1024×1024 PNG로 통일을 추천합니다.
- **파일명 일치**: HTML이 `onerror` 폴백 이모지로 자동 대체하므로, 파일명을 잘못 적어도 페이지는 깨지지 않습니다. 다만 일러스트를 표시하려면 [`images/.gitkeep`](images/.gitkeep) 에 적힌 이름과 **정확히** 일치해야 합니다.
- **용량**: GitHub Pages 무료 계정이지만, 카드 아이콘은 가급적 PNG 200KB 이하로 압축해 두면 첫 로딩이 빨라집니다 ([TinyPNG](https://tinypng.com/) 추천).

---

작업 순서 추천:

1. 1번(회의록) 프롬프트로 톤 잡기
2. 마음에 들면 같은 채팅에서 2~10번을 순차적으로 생성
3. 마지막으로 Hero 일러스트(가장 큰 캔버스라 시간 많이 걸림) 생성
4. `images/` 폴더에 정확한 파일명으로 저장 → 브라우저 새로고침
