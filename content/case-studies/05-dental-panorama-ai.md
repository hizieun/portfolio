---
slug: dental-panorama-ai
title: 치과 파노라마 AI — 연령 예측 & 매복치 분석
subtitle: 반지도학습(SSL)으로 라벨 비용을 줄이면서도 임상 수준 정확도 달성
company: 자이플래닛 (정규직, 주임연구원)
role: Data & Experiment Lead (4인 연구팀)
period: 2021.10 – 2022.04
duration: 7 months
domain: Medical AI / Computer Vision
status: Published — 국제 학술지 2건 게재
tldr: 치과 파노라마 X-ray 기반 환자 연령 예측 + 매복치 발치 난이도 판정 AI 모델 개발. LaplaceNet 기반 SSL로 지도학습 수준의 80%+ 정확도 확보. BMC Oral Health, DMFR에 공동저자로 등재.
stack:
  ml: [PyTorch, Ray]
  models: [DenseNet, WideResNet, LaplaceNet]
  tools: [Python, Jupyter, Pandas, Matplotlib, Seaborn]
metrics:
  - { label: "SSL 정확도", value: "80%+", detail: "지도학습 수준 달성, 라벨 의존성 ↓" }
  - { label: "국제 학술지 게재", value: "2건", detail: "BMC Oral Health 2023, DMFR 2023" }
papers:
  - title: "Application of entire dental panorama image data in artificial intelligence model for age estimation"
    venue: BMC Oral Health
    date: 2023-12-15
    url: https://link.springer.com/article/10.1186/s12903-023-03745-x
  - title: "The efficacy of supervised learning and semi-supervised learning in diagnosis of impacted third molar on panoramic radiographs through artificial intelligence model"
    venue: DMFR
    date: 2023-05-16
    url: https://doi.org/10.1259/dmfr.20230030
---

## TL;DR

치과 파노라마 영상을 기반으로 환자의 연령을 예측하고 매복치 발치 난이도를 판단하는 AI 모델을 개발했습니다. 핵심 인사이트는 **반지도학습(SSL)으로 라벨 비용을 줄이면서도 임상 수준의 정확도**를 낼 수 있다는 것을 실험으로 입증.

연구 성과는 **BMC Oral Health (2023)**, **DMFR (2023)** 국제 학술지 2건에 공동저자로 게재.

## Role

4인 연구팀에서 **데이터 처리 및 모델 실험 총괄**. LaplaceNet 기반 SSL 모델 성능 실험을 설계·실행하고, 논문 Figure 및 결과 정리를 담당했습니다.

## Approach

### 파노라마 영상 기반 연령 예측 모델

DenseNet, WideResNet 기반 지도학습 baseline 구축. 파노라마 영상에서 *연령대별 특징*을 추출하는 모델.

### SSL vs SL 비교 실험

의료 영상은 *전문가 라벨링 비용*이 매우 비싸 — 충분한 라벨 데이터 없이도 임상 수준 정확도를 낼 수 있는지가 핵심 질문이었습니다.

**LaplaceNet 기반 SSL** 모델 실험을 설계하고, 지도학습과 성능 비교. 결과적으로 SSL이 지도학습 수준의 정확도를 *훨씬 적은 라벨로* 달성할 수 있음을 입증.

### Heuristic Grouping 적용

연령 예측에서 ±3년 편차의 휴리스틱 그룹화를 적용해 *모든 모델에서 예측 정확도가 개선*되는 것을 확인. 단순 정확도 metric을 넘어 *임상적으로 의미 있는 범위*의 예측 평가.

### 하이퍼파라미터 튜닝 자동화

PyTorch 기반 모델 구현 + **Ray 라이브러리로 Grid Search 자동화**. 수작업으로 돌리면 끝나지 않을 실험을 자동화 인프라로 효율화.

## Results

| 결과 | 상세 |
|---|---|
| **SSL 정확도** | **80%+** — 지도학습 수준 정확도를 *훨씬 적은 라벨*로 달성 |
| **국제 학술지 게재** | **2건** — BMC Oral Health (2023), DMFR (2023) 공동저자 |
| **연구 기여** | 데이터 처리·실험 설계·Figure 정리 총괄 |
| **임상적 의미** | Heuristic grouping(±3년)으로 임상적으로 활용 가능한 정확도 범위 입증 |

## Publications

1. **"Application of entire dental panorama image data in artificial intelligence model for age estimation"**
   _BMC Oral Health_, 2023-12-15 · [Springer Link](https://link.springer.com/article/10.1186/s12903-023-03745-x)

   WideResNet + DenseNet 지도학습 + 휴리스틱 그룹화(±3년 편차)로 예측 정확도 향상. 전체 영상 활용 방식이 기존 대비 더 효과적인 연령 추정 성능을 보임을 입증.

2. **"The efficacy of supervised learning and semi-supervised learning in diagnosis of impacted third molar on panoramic radiographs through artificial intelligence model"**
   _DMFR_, 2023-05-16 · [DOI](https://doi.org/10.1259/dmfr.20230030)

   WideResNet(SL) vs LaplaceNet(SSL) 비교 — SSL이 *소량의 라벨링 데이터만으로* SL과 유사한 80%+ 정확도를 유지함을 입증. 의료 영상 분석에서 SSL의 실용 가능성 제시.

## Stack

- **Framework**: PyTorch, Ray
- **Models**: DenseNet, WideResNet, LaplaceNet
- **Tools**: Python, Jupyter, Pandas, Matplotlib, Seaborn
