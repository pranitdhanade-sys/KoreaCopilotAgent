# 아이콘 라이브러리 (icon library)

카드 작성 시 일관된 비주얼을 빠르게 적용할 수 있도록 미리 생성·큐레이팅한
3D flat 아이콘 모음입니다. ChatGPT 이미지 생성으로 만든 1024×1024 PNG들이며,
모든 아이콘은 흰 배경 · 부드러운 파스텔 그라데이션 · 라운드 형태로 통일된
스타일을 가집니다.

## 사용 방법

`data/*.json` 카드의 `icon` 필드에 이 폴더 경로를 적기만 하면 끝입니다.

```jsonc
{
  "id": "my-new-card",
  "icon": "images/library/work/meeting.png",
  "fallbackEmoji": "👥",
  ...
}
```

새로 일러스트를 생성할 필요가 없는 경우 라이브러리를 먼저 살펴보세요.
딱 맞는 아이콘이 없을 때만 카드 전용 일러스트를
`images/illustrations/<card-id>.png` 로 만듭니다.

## 구조

```
images/library/
├── index.json            # 전체 아이콘 매니페스트 (검색·태그용)
├── README.md             # 이 파일
├── work/                 # 회의, 메일, 문서, 달력, 보고서, 스케줄, 화이트보드, 스티키노트
├── ai/                   # 로봇, 반짝, 두뇌, 칩, 에이전트, 프롬프트, 벡터, 파인튜닝
├── data/                 # 차트, 대시보드, 검색, 테이블, 필터
├── comm/                 # 채팅, 팀, 공유, 알림
├── knowledge/            # 전구, 책, 학위모, 인용, 아이디어
├── time/                 # 시계, 모래시계, 타이머
├── security/             # 방패, 자물쇠, 열쇠, 지문, 금고, 배지
├── org/                  # 사람들, 고객, 역할, 매니저, 파트너
├── process/              # 워크플로, 자동화, 톱니, 동기화, 순환
├── content/              # 이미지, 비디오, 오디오, 팟캐스트, 번역
└── misc/                 # 별, 하트
```

## index.json 스키마

```jsonc
{
  "version": 1,
  "generated": "ISO-8601",
  "icons": [
    {
      "id": "work-meeting",                 // <category>-<name>
      "file": "library/work/meeting.png",   // images/ 기준 상대 경로
      "category": "work",
      "tags": ["회의", "미팅", "meeting", "사람들"],
      "palette": "mint+sky"                 // copilot-instructions.md 팔레트 표기
    }
  ]
}
```

## 새 아이콘 추가 시

1. `.github/copilot-instructions.md` §3 의 프롬프트 템플릿 그대로 사용
2. 1024×1024 PNG, 흰 배경, 글자 없음 원칙 지킬 것
3. 파일은 적절한 카테고리 폴더 아래 `<name>.png` 로 저장
4. `index.json`에 항목 추가 (한국어·영어 태그 모두 넣기)
5. 카테고리가 새로 필요하면 README 구조 표도 함께 업데이트
