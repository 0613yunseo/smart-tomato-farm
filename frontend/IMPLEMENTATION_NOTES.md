# 구현 범위 및 후속 백엔드 작업

## 구현 완료 (프론트엔드 MVP)
- 반응형 웹 화면 / 6개 메뉴
- A/B 하우스 전환, 6종 측정값
- 기간별 환경 데이터 그래프, CSV 저장
- 장치 ON/OFF 및 자동/수동 모드 **시뮬레이션**
- 브라우저 저장 기반 재배일지 입력
- 알림 이력 및 읽음 처리
- 서버의 환경 최신값 조회용 API 어댑터

## 구현하지 않은 범위
- Spring Boot 백엔드와 JPA, DB 테이블, 회원 인증
- 실제 센서/게이트웨이/MQTT 구동
- 서버 명령 큐, 현장 제어 장치 인터록
- 실제 급액 이력, 작기 및 수확 데이터 저장
- 원격 알림 연동

## Spring Boot 단계 권장 순서
1. DB 테이블: greenhouses, zones, sensors, sensor_readings, devices, control_logs, nutrient_records, alerts, crop_cycles
2. GET /api/zones/{id}/environment/latest + 목록 조회
3. MQTT 데이터 수신 -> 검증 -> 측정값 저장
4. GET /api/zones/{id}/environment/history, GET /api/zones/{id}/nutrients
5. Spring Security 인증/권한, 제어 API (현장안전검증 이전에는 제어 비활성화)
6. MQTT 제어 명령 + requestId + 명령 완료 회신, 장애 대처
