---
slug: jinhak-ocr-admissions
title: 대학 입학전형 OCR 자동화 시스템
subtitle: 다양한 양식의 모집요강·학생부를 자동으로 인식·정리
company: 진학사 (정규직, PD)
role: Deep Learning Engineer (3인 TF · 딥러닝 리더)
period: 2022.05 – 2023.07
duration: 1 year 3 months
domain: EdTech / Document Intelligence
status: Shipped — 프로토타입 완성, 특허 출원
tldr: 대학 입학전형 자료(모집요강·학생부)를 자동 인식·정리하는 OCR 딥러닝 시스템. 다양한 양식 대응 전처리 로직과 한글 특화 모델 비교로 수작업 대비 입력 시간 40% 단축. 특허 출원 1건 참여.
stack:
  ml: [TensorFlow, Google Cloud Vision API]
  backend: [Python, Flask]
  frontend: [JavaScript]
  tools: [GitHub, Figma, Notion, Dooray]
metrics:
  - { label: "입력 시간 단축", value: "40%", detail: "수작업 대비" }
  - { label: "특허 출원", value: "1건", detail: "딥러닝 기반 OCR 시스템" }
---

## TL;DR

대학 입학전형 자료(모집요강·학생부 등)를 *자동으로 인식하고 정리*하는 OCR 기반 딥러닝 시스템을 개발. 다양한 양식을 처리할 수 있도록 모델과 전처리 로직을 설계하고, 실제 서비스를 위한 프로토타입까지 구현했습니다.

**수작업 대비 입력 시간 40% 단축**, **특허 출원 1건 참여**.

## Role

3인 TF에서 **딥러닝 모델 개발 및 프로토타입 구현**을 담당. 입학 서류 스캔 이미지에 대한 텍스트 인식 및 후처리 로직을 직접 설계했고, 특허 TF로 참여해 기술 문서 작성 및 기획을 지원했습니다.

## Approach

### OCR 성능 실험 & 한글 특화 모델 비교

학교마다 모집요강 양식이 다르고, 학생부 스캔본은 표/텍스트가 혼재합니다. 한국어 OCR 환경에서 어느 모델이 가장 안정적인지 비교 실험을 먼저 진행.

### 양식 다양성 대응 전처리 로직

OCR 결과를 그대로 쓰기 어려운 이유는 *양식이 학교마다 다르기 때문*. 텍스트 정규화 + 키워드 추출 로직을 설계해 *학교 양식 차이를 흡수*하는 후처리 레이어를 만들었습니다.

### 주요 필드 영역 인식

모집단위·전형명·전형 요소 같은 *구조적 필드*에 대해 영역 인식 구조를 설계. 단순 텍스트 추출이 아니라 *문서 구조를 이해하는* 방향.

### Flask 기반 웹 프로토타입

모델만 만들고 끝내지 않고, Flask 기반 웹 프로토타입을 직접 개발해 프론트엔드와 연동 테스트까지. 모델이 *실제 서비스에 붙는 흐름*을 검증.

### 특허 TF 참여

기술 개요와 구현 방식을 정리하는 단계에 참여. 딥러닝 모델을 *지식재산권으로 보호*하는 경험.

## Results

| 결과 | 상세 |
|---|---|
| **수작업 대비 입력 시간** | **40% 단축** |
| **OCR 전처리 로직** | 다양한 양식에 대응 가능한 정규화 + 키워드 추출 구조 확보 |
| **특허 출원** | 1건 참여 (딥러닝 기반 OCR 시스템) |
| **프로토타입** | Flask 기반 웹 데모, 프론트엔드 연동 테스트 완료 |

## Stack

- **ML / OCR**: TensorFlow, Google Cloud Vision API
- **Backend**: Python, Flask
- **Frontend**: JavaScript
- **Collaboration**: GitHub, Figma, Notion, Dooray
