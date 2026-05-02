# VA 아침 발표 — Fluid Lab + Fluid Machinery Studio

## 핵심 메시지

밤 사이 산출물은 **두 개**로 정리했다.

1. **Fluid Lab 교육 페이지**: 유체역학을 공식보다 먼저 그림·슬라이더·짧은 질문으로 이해하게 하는 로컬 웹페이지
2. **Fluid Machinery Studio**: CFD가 아니라, 1D/BEM/meanline/similarity-law 감각으로 유체기계 예비 설계 트레이드오프를 보는 가벼운 브라우저 GUI

`Drone CFD Scout`는 사이드 실험으로만 남겼고, 이번 아침 메인 발표에서는 제외한다.

## 위치와 실행

- 작업 폴더: `/Users/va/.openclaw/workspace/va-fluid-lab-night/`
- 메인 페이지: `/Users/va/.openclaw/workspace/va-fluid-lab-night/index.html`
- 발표 노트: `/Users/va/.openclaw/workspace/va-fluid-lab-night/reports/MORNING_PITCH_ko.md`

실행:

```bash
cd /Users/va/.openclaw/workspace/va-fluid-lab-night
python3 -m http.server 8765
```

열기:

- 브라우저에서 `http://localhost:8765`
- 또는 `index.html` 직접 열기

## 1) Fluid Lab — 쉬운 시각 학습

포함된 카드:

- 정수압: 깊이·밀도에 따라 `p = p0 + rho g h`가 어떻게 커지는지 화살표로 표시
- 점성: Couette/Poiseuille 속도분포와 전단응력 직관
- Hydraulic jump: Froude 수, sequent depth, 에너지 손실을 시각화
- 내부유동: Reynolds 수, 층류/천이/난류 판단, 관 마찰 손실
- 외부유동: drag equation, Cd, wake/separation, 형상 차이

개선점:

- 한국어 우선 설명
- 3분 아침 투어 추가
- 각 카드에 짧은 concept check 추가
- 헷갈리는 지점/가정/제한을 명시
- 공식 → 변수 → 슬라이더 → 그림 변화 흐름으로 구성

## 2) Fluid Machinery Studio — preliminary design GUI

목적:

- 실제 CFD solver가 아니라, 설계 초기에 “어떤 파라미터가 추력·토크·동력·효율을 어떻게 움직이는지” 보는 도구

입력:

- chord
- pitch angle
- radius
- rpm
- flow speed
- blade count

출력:

- thrust 추정
- torque 추정
- shaft power 추정
- propulsive efficiency 추정
- stall/받음각, tip speed, solidity, power loading 관련 경고
- rpm sweep curve

아침 데모는 rpm과 pitch를 바꾸면서 “추력은 늘지만 동력 요구와 경고가 같이 커진다”는 점을 보여주면 가장 직관적이다.

## 블로커 / 제한

- 현재는 교육용·예비 설계용 추정치이며, 검증된 성능맵이나 CFD 결과가 아니다.
- 단위 프리셋, 예제 프리셋, CSV/PNG export는 아직 없다.
- 실제 설계에는 실험 데이터, 형상 세부 치수, 구조/소음/모터 한계, 단위 검증이 필요하다.
- `tools/drone-cfd-scout/`는 보관만 되어 있으며 메인 발표 대상이 아니다.

## 한 줄 발표 멘트

**Fluid Lab은 유체역학을 눈으로 배우는 페이지이고, Fluid Machinery Studio는 CFD 전에 설계 감각을 빠르게 잡는 lightweight preliminary design GUI다.**