# Smart Tomato Farm — 관제 대시보드 MVP

시스템 분석 및 설계 과제에서 정의한 **방울토마토 양액재배 스마트팜**의 React 프론트엔드 시연용 구현입니다.

> 현재 상태: **데모 데이터 기반 프론트엔드 MVP**. 실제 IoT 센서, MQTT Broker, Spring Boot, PostgreSQL 서버와 연결되지 않았고 제어 버튼은 물리 장치를 작동시키지 않습니다.

## 실행 방법

```powershell
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접근합니다. Node.js 20.19+ 또는 Node.js 22.12+ 권장.

## 구현 화면

- 종합 관제: 6개 환경 지표, 기간별 차트, 양액 공급 현황, 장치 작동 상태, 최근 알림
- 환경 모니터링: 하우스 선택, 측정값/기준표, 기간별 그래프, CSV 내보내기
- 양액 관리: EC 및 급액량 시각화, 급액 일정·이력 표시, CSV 내보내기
- 설비 제어: 자동/수동 모드 및 ON/OFF 시뮬레이션, 제어 로그
- 생육·수확 관리: 작기 개요, 재배일지 추가 (브라우저 로컬 저장)
- 알림 이력: 위험·주의 이벤트 및 모두 읽음 처리

## 파일 구조

```text
frontend/
├── src/
│   ├── App.tsx          # 페이지, 컴포넌트, 상태 관리
│   ├── styles.css       # 전체 반응형 UI
│   ├── data/mock.ts     # 센서·이벤트 데모 데이터
│   ├── lib/data.ts      # API adapter, CSV, 히스토리
│   └── main.tsx
├── .env.example         # API 연결 환경변수 예시
├── package.json
└── vite.config.ts
```

## 추후 백엔드 연결

`frontend/.env.example`을 참고해 `.env`를 만들고 `VITE_DATA_MODE=api`, `VITE_API_BASE_URL=http://localhost:8080/api`로 설정합니다. `src/lib/data.ts`의 `loadLatest()`는 기존 계획서의 `/api/zones/{id}/environment/latest` 경로를 사용할 준비가 되어 있습니다.

현재 **하우스 ID A/B는 데모 식별자**이므로 실제 서버의 재배 구역 ID에 맞춰 매핑해야 합니다. 현재 API 모드는 **최신 환경 수치 조회만 시도**하며, 나머지 차트/급액/장치/알림 데이터는 데모입니다. 제어 API를 실장비와 연동하기 전에는 인증, 권한, 안전 인터록, 명령 중복 방지, 장치 실행 확인, 감사 로그가 필수입니다.

## GitHub 통합

기존 저장소 `https://github.com/0613yunseo/smart-tomato-farm` 아래에 이 ZIP의 `frontend/` 폴더를 추가하세요. 기존 `docs/`, `diagrams/`, `prompts/`는 수정하지 않습니다.

## 보안 및 데이터 주의

- `localStorage` 데이터는 **브라우저에만** 저장되며 공유 기기 사용에 적합하지 않습니다.
- 모든 숫자는 시연을 위한 예시값이며 농학적 권장 설정을 뜻하지 않습니다.
- 하우스·작기 관련 문구는 기획 시안이고 실제 운영 데이터가 아닙니다.
