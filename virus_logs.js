// virus_logs.js
// 2050년형 해킹 로그 시뮬레이션 (BMS/TLS/FOTA/Firmware Attack 등)

const logLines = [
  "[22:45:01] 스니퍼 모듈 초기화: 5G V2X 패킷 캡처 시작...",
  "[22:45:02] TLS 1.4.0 핸드셰이크 시도: 인증서 신뢰 체인 무결성 검사 실패 (CVE-2049-5678)",
  "[22:45:03] MAC 주소 스푸핑: 원격 BMS 컨트롤러 접근 경로 확보.",
  "[22:45:04] FOTA(펌웨어 OTA) 서명 무결성 우회 성공. 비인가 코드 실행 루트 확보.",
  "[22:45:05] BMS TLS channel hijack 완료. 행위 가능한 스케줄러 진입중...",
  "[22:45:06] 배터리 셀 서브시스템 API 제어 → SOC 값 조작 명령 송신.",
  "[22:45:07] LiDAR 센서 → Active Camo Spoofing 모듈 로딩 중...",
  "[22:45:08] 소프트웨어 렌즈 왜곡 알고리즘 인젝션: 전방 물체 False Negative 처리.",
  "[22:45:09] GPS 위성 신호 스푸핑: GNSS 오차값 120m로 설정.",
  "[22:45:10] CAN 버스 트래픽 분석: 보안 토큰 비활성화 프레임 주입.",
  "[22:45:11] BMS 센서 피드백 왜곡: 셀 온도 30°C → 80°C 로 래핑 중...",
  "[22:45:12] ICE 모듈(냉각 펌프) 제어 우회: PID 루프 잠금 해제 실패.",
  "[22:45:13] 메모리풀 오버플로우 트리거: ECU 안전 모듈 응답 지연 시작.",
  "[22:45:14] 랜덤 갈바닉 셀 밸런스 조작 → 1.2V → 2.5V 차이 발생.",
  "[22:45:15] 네트워크 패킷 지연 800ms 초과: V2X 모듈 부하 급증.",
  "[22:45:16] 배터리 팩 온도 모니터링 비활성화 → 열폭주 카운트다운 시작.",
  "[22:45:17] ECU watchdog 타이머 해제 → 자율 제어 루프 0% 응답.",
  "[22:45:18] BMS 셀 07 온도 95°C 돌파 → DSC(열폭주 억제 장치) 무력화.",
  "[22:45:19] [CRIT] THERMAL RUNAWAY 인식: 폭발 임박 상태 (3초 남음)",
  "[22:45:20] ████████████████ EXECUTING SELF-DESTRUCT SEQUENCE ████████████████"
];

function startLogSequence(callback) {
  const output = document.getElementById('log-output');
  let idx = 0;

  function typeLine(line, delay = 15) {
    let i = 0;
    const lineElem = document.createElement('div');
    output.appendChild(lineElem);

    function typeChar() {
      if (i < line.length) {
        lineElem.textContent += line.charAt(i);
        i++;
        setTimeout(typeChar, delay);
      }
    }
    typeChar();
  }

  function run() {
    if (idx < logLines.length) {
      typeLine(logLines[idx]);
      idx++;
      const nextDelay = Math.random() * 500 + 200; // 0.2~0.7초 랜덤 간격
      setTimeout(run, nextDelay);
    } else {
      // 로그 출력 완료 시 콜백 실행
      if (callback) callback();
    }
    output.scrollTop = output.scrollHeight;
  }

  run();
}
