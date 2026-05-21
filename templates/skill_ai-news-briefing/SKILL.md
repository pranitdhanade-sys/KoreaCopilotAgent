---
name: ai-news-briefing
description: |
  어제(전일) Microsoft, AWS, Google, Anthropic의 AI 관련 최신 뉴스를
  수집·정리하여 한국어 리포트로 작성하고, Word 문서와 PowerPoint 슬라이드로
  만들어 사용자에게 이메일로 발송한다. 원문 제목은 영어로 병기한다.
  Use when user asks "어제 AI 뉴스 정리해줘", "아침 AI 브리핑",
  "AI 대형 벤더 동향 리포트", "Microsoft AWS Google Anthropic 최신 소식",
  "어제자 AI 업계 소식 보내줘", "AI 뉴스 브리핑 보내줘".
  Do NOT use for: 일반 IT 뉴스 요약, 특정 제품 심층 분석,
  실시간(오늘) 뉴스 모니터링, AI 외 산업 동향.
cowork:
  category: research
  icon: SearchSparkle
---

# 어제의 AI 브리핑 (ai-news-briefing)

## Overview

매일 아침 또는 필요할 때, **전일(어제) 하루** 동안 발표된 4대 AI 벤더
(Microsoft, AWS, Google, Anthropic)의 주요 AI 관련 뉴스를 모아
한국어 리포트로 정리한다. Word(.docx)와 PowerPoint(.pptx) 두 가지
포맷으로 만들어 사용자(jeongwoo.choi@microsoft.com)에게 이메일로 발송한다.

## 워크플로

### 1. 날짜 확정
- `Current local time`(KST)에서 "어제" 날짜를 계산
- 검색 윈도우: 어제 00:00 ~ 23:59 KST
- 리포트 제목에 명시: 예) "AI 브리핑 — 2026년 5월 14일(목)"

### 2. 뉴스 수집 (병렬 web_search)
4개 쿼리를 **한 번의 응답에서 병렬로** 실행:
- `web_search("Microsoft AI news <어제 날짜>")`
- `web_search("AWS AI news <어제 날짜>")`
- `web_search("Google AI news <어제 날짜>")`
- `web_search("Anthropic news <어제 날짜>")`

각 결과에서:
- **날짜가 어제와 일치**하는 항목만 채택 (윈도우 밖은 폐기)
- AI 관련성 확인 (모델·연구·제품·파트너십·정책 등)
- 출처 URL과 원문 제목 보존

### 3. 정리 형식 (벤더별 섹션)
각 벤더마다:
- **헤드라인 (한국어 · 원문 영문 병기)**
- 핵심 요점 2–3줄 (한국어, 사실 기반)
- Solution Engineer 관점에서의 시사점 1줄 (있다면)
- 출처 링크

근거 없는 추정·해석 금지. 검색 결과에 없는 내용은 만들지 않는다.
어떤 벤더에서 어제 의미 있는 발표가 없으면 "어제 주요 발표 없음"으로 표기.

### 4. 문서 생성 (병렬)
두 작업을 동시에 수행:
- **docx 스킬 호출** → `output/AI-Briefing-<YYYYMMDD>.docx`
  - 표지: 제목, 날짜, 작성자
  - 벤더별 섹션(H1), 뉴스별 소항목(H2)
  - 출처 링크 하이퍼링크 처리
- **pptx 스킬 호출** → `output/AI-Briefing-<YYYYMMDD>.pptx`
  - 표지 슬라이드
  - 벤더별 1–2장 (헤드라인 + 요점)
  - 마지막 "한눈에 보기" 요약 슬라이드

문서 내 모든 수치·인용은 검색 결과 출처로 추적 가능해야 한다.

### 5. 이메일 발송
- 수신: `jeongwoo.choi@microsoft.com` (본인)
- 제목: "[AI 브리핑] <YYYY-MM-DD> Microsoft·AWS·Google·Anthropic 동향"
- 본문(HTML): 4개 벤더 헤드라인을 불릿으로 짧게 미리보기 + "상세 내용은 첨부 파일 참고"
- 첨부: 위 .docx와 .pptx 두 파일 (`direct_attachment_file_paths`)
- 도구: `SendEmailWithAttachments`

### 6. 완료 보고
사용자에게 한 줄로:
- 어느 벤더에서 몇 건씩 정리했는지
- 메일을 보냈다는 사실
- 어제 뉴스가 없었던 벤더가 있으면 명시

## 진행 상황 표시
시작 시 TaskCreate로 4단계 작성:
1. "어제 AI 뉴스 검색"
2. "내용 정리·번역"
3. "Word·PowerPoint 문서 생성"
4. "이메일 발송"
각 단계 시작 시 `in_progress`, 완료 시 `completed`로 업데이트.

## 가드레일
- **사실 충실**: 검색 결과에 없는 내용·수치·인용 생성 금지. 부족하면 "확인되지 않음"으로 표기.
- **날짜 엄수**: "어제"가 아닌 뉴스는 포함하지 않는다.
- **언어**: 본문 한국어, 제품·기술·뉴스 제목은 영문 원문 병기.
- **출처**: 모든 뉴스 항목에 URL 출처를 남긴다.
- **중복 발송 금지**: 한 실행당 메일은 1회만.

## When NOT to Use
- 오늘(실시간) 또는 지난 주 단위 뉴스 → 사용 안 함
- 4대 벤더 외 회사(OpenAI, Meta 등) → 사용자가 명시적으로 요청한 경우가 아니면 미포함
- 단일 제품·논문 심층 분석 → `deep-research` 에이전트 사용 권장
- 일반 IT/비즈니스 뉴스 → 사용 안 함
