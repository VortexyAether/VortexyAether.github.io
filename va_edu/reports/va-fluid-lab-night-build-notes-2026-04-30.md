# VA Fluid Lab Night — Build Notes

## 변경 요약

- `index.html`: 아침 데모용 learning path와 Fluid Machinery Studio preliminary design GUI를 전면 산출물로 정리했다.
- `assets/fluid-lab.js`: 기존 교육용 유동 시각화에 더해 chord, pitch, radius, rpm, flow speed, blade count 기반 유체기계 sizing 추정과 rpm sweep curve를 추가했다.
- `assets/style.css`: Fluid Machinery Studio 입력/결과/경고/곡선 영역 스타일을 추가하고 모바일 레이아웃을 맞췄다.
- `README.md`: 메인 deliverable을 Fluid Lab 교육 페이지와 Fluid Machinery Studio로 수정했다.
- `reports/MORNING_PITCH_ko.md`, `reports/va-fluid-lab-night-morning-pitch-2026-04-30.md`: 아침 피치에서 Drone CFD Scout를 제외하고 Fluid Machinery Studio 중심으로 재작성했다.
- `docs/TEACHING_POLISH.md`: 다음 단계 메모를 유체기계 예비 설계 교육 흐름에 맞게 업데이트했다.
- `assets/site-preview.svg`: 세 번째 미리보기 카드를 Fluid Machinery Studio로 교체했다.

## 실행

Static site:

```bash
cd /Users/va/.openclaw/workspace/va-fluid-lab-night
python3 -m http.server 8765
```

Open: `http://localhost:8765`

브라우저에서 바로 열 경우 `index.html`도 동작한다.

## 현재 핵심 산출물

- `index.html`
- `assets/fluid-lab.js`
- `assets/style.css`
- `reports/MORNING_PITCH_ko.md`
- `reports/va-fluid-lab-night-morning-pitch-2026-04-30.md`

## Fluid Machinery Studio 범위

- 입력: chord, pitch angle, radius, rpm, flow speed, blade count
- 출력: thrust, torque, shaft power, propulsive efficiency, warnings, rpm sweep curve
- 모델: 1D/BEM/meanline/similarity-law 감각을 주는 교육용 근사
- 제한: 검증된 CFD나 시험 기반 성능맵이 아니며 preliminary design intuition에만 사용

## Archived side experiment

`tools/drone-cfd-scout/`는 기존 생성 파일을 유지하되 이번 아침 메인 deliverable로 발표하지 않는다. OpenFOAM/CFD handoff는 선택적 미래 확장으로만 취급한다.

## 검증

수행한 검증:

- `node --check assets/fluid-lab.js`
- `python3 -m compileall -q tools/drone-cfd-scout/src`
- `HTMLParser`로 `index.html`, `assets/site-preview.svg` 파싱
- 주요 정적 파일 non-empty 확인

참고: 현재 샌드박스가 localhost socket bind를 막아 `python3 -m http.server` 실행 확인은 수행하지 못했다. 정적 파일 자체의 파싱과 JS 문법 검증은 통과했다.
