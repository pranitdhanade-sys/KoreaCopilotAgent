---
name: daily-work-wrapup
description: |
  매일 오후 7시(KST)에 실행되는 데일리 업무 마무리 브리핑.
  오늘 진행된 업무(회의·이메일·Teams 챗·문서)와 내일 예정된 업무를
  정리해 한국어 Word 문서(.docx)로 만들고, 사용자 본인 메일로 발송한다.
  Use when user asks to "데일리 브리핑", "업무 정리", "오늘 뭐 했지",
  "daily wrapup", "하루 마무리 정리", "오늘 한 일 정리해줘",
  "내일 일정 정리", "오늘 업무 요약".
  Do NOT use for: 아침 브리핑(daily-briefing 사용), 특정 회의 요약
  (meeting-intel 사용), 주간/월간 보고서(stakeholder-comms 사용).
cowork:
  category: productivity
  icon: DocumentText
---

# Daily Work Wrap-Up (데일리 업무 마무리)

하루 일과를 마무리하는 시점(기본 19:00 KST)에 실행되어, 오늘 한 일과
내일 할 일을 한 장의 Word 문서로 정리해 본인 메일로 보내준다.

## When NOT to Use

- 아침 브리핑이 필요한 경우 → `daily-briefing` 스킬 사용
- 특정 회의 한 건 요약 → `meeting-intel` 사용
- 리더십/팀 대상 주간 보고 → `stakeholder-comms` 사용
- 단순히 오늘 일정만 확인 → 캘린더 조회로 충분

## Workflow

### 1. 시간 범위 결정
- 오늘 = 사용자 로컬 시간 기준 00:00 ~ 23:59 (KST)
- 내일 = 다음 날 00:00 ~ 23:59 (KST)
- `Current local time`에서 날짜 추출 (YYYY-MM-DD)

### 2. 데이터 수집 (병렬 실행)
다음을 `TaskCreate`로 등록 후 병렬 처리:

| 작업 | 도구 | 파라미터 |
|------|------|----------|
| 오늘 참석 회의 | `ListCalendarView` | start=오늘 00:00, end=오늘 23:59 |
| 내일 예정 회의 | `ListCalendarView` | start=내일 00:00, end=내일 23:59 |
| 오늘 받은 메일 | `ListMessages` | received_after=오늘 00:00, top=25 |
| 오늘 보낸 메일 | `ListMessages` | folder_id=sentitems, received_after=오늘 00:00 |
| 오늘 Teams 대화 | `SearchM365` | sources=["teams"], after=오늘 |
| 최근 문서 | `SearchM365` | sources=["files"], 최근 수정 |

### 3. 분석 및 분류
- **회의**: 제목, 시간, 참석자(상위 5명), 본인이 organizer 여부
- **이메일**: 발신자, 제목, 핵심 내용 한 줄 요약 — 사적인/민감 메일은 제목만
- **Teams**: 상대방, 대화 요지(스레드별 1줄)
- **문서**: 제목, 마지막 수정 시각
- **액션 아이템**: 메일/챗/회의에서 본인이 약속한 후속 작업 추출

### 4. Word 문서 생성
`docx` 스킬을 호출해 다음 구조로 생성:

- **제목**: `{YYYY-MM-DD} 데일리 업무 브리핑`
- **1. 오늘의 요약** — 2~3줄 핵심 정리
- **2. 오늘 진행된 업무**
  - 2.1 회의 (표: 시간 / 제목 / 참석자 / 메모)
  - 2.2 이메일 (받은 메일 / 보낸 메일)
  - 2.3 Teams 대화
  - 2.4 작업한 문서
- **3. 내일 예정 업무**
  - 3.1 회의 일정 (표)
  - 3.2 준비가 필요한 후속 액션
- **4. 미완료 액션 아이템** (체크박스 형식)

파일명: `output/daily-briefing-{YYYY-MM-DD}.docx`

### 5. 이메일 발송
`SendEmailWithAttachments`로 본인에게 발송:

- **To**: `jeongwoo.choi@microsoft.com`
- **Subject**: `[데일리 브리핑] {YYYY-MM-DD} 업무 정리`
- **Body** (HTML): 문서의 "1. 오늘의 요약" 섹션을 본문에 인라인으로 포함 + "자세한 내용은 첨부 파일을 확인하세요."
- **direct_attachment_file_paths**: `["output/daily-briefing-{YYYY-MM-DD}.docx"]`

### 6. 확인
사용자에게 짧게 보고: "오늘({YYYY-MM-DD})자 데일리 브리핑을 메일로 보냈어요."

## Guardrails

- 데이터 수집 중 일부 소스가 실패해도 나머지로 진행하고, 문서에 "{소스} 조회 실패" 명시
- 회의/메일이 0건이면 해당 섹션에 "오늘 진행된 항목 없음" 표기 — 섹션 생략 금지
- 민감/개인 일정(`sensitivity=private`)은 시간 블록만 표기, 제목은 "Private appointment"
- 사실을 지어내지 않는다 — 도구 결과로 확인된 내용만 기재
- 첨부 파일 경로가 `output/`에 실제 존재하는지 `Glob`으로 확인 후 발송
- 자동 실행 모드(scheduled run)에서는 사용자에게 추가 질문하지 않고 합리적 기본값으로 진행

## Scheduled Execution

이 스킬은 매일 19:00 KST에 `SetupScheduledPrompt`로 자동 실행되도록
별도 등록되어 있다. 수동 실행도 트리거 키워드로 가능하다.
