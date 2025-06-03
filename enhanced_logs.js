// enhanced_logs.js
// 심화 해킹 로그 (더 세밀한 센서, 통신, ECU 우회 등)

const enhancedLogLines = [
  "[22:45:26] CPU LOAD 급증: 88% → 94% → 99%",
  "[22:45:27] 작업 스케줄러 오버플로우: 스레드 큐 길이 1024/1024",
  "[22:45:28] 냉각 팬 RPM 이상 감지: 12000 → 4000 (모터 제어 루트킷 우회)",
  "[22:45:29] BMS 셀 12 온도 120°C → 145°C 급상승",
  "[22:45:30] THERMAL RUNAWAY: 스프링쿨러 밸브 차단",
  "[22:45:31] 외부 CAN 버스 데이터 시그니처 변조: 성능 로그 위변조",
  "[22:45:32] 주행 제어 알고리즘 스레드 강제 차단 → 엔진 제어 없음",
  "[22:45:33] 도관 압력 상승 감지: 3.2bar → 5.8bar (펌프 비정상 작동)",
  "[22:45:34] 냉각 액체 누출 감지: 드리프트 센서 오류 지속",
  "[22:45:35] CPU 온도 95°C 돌파 → 스로틀링 실패",
  "[22:45:36] MEM OOM(Out Of Memory): 페이지 파일 스왑 100% 사용 중",
  "[22:45:37] 차량 속도 센서 오프라인 → 급격한 감속 불가",
  "[22:45:38] GPU 가속 라이브러리 파괴 → LiDAR/카메라 데이터 처리 불가",
  "[22:45:39] ECU watchdog 재설정 명령 무시 → 제어 루프 중단",
  "[22:45:40] HEAT SIGNATURE 200°C 이상 상승 중 → 폭발 임박",
  "[22:45:41] BATTERY PACK PRESSURE 6.2bar → BLEED VALVE FAIL",
  "[22:45:42] ████████████████████████████████████████████████████"
];

function startEnhancedLog(callback) {
  const output = document.getElementById('enhanced-log-output');
  let idx = 0;

  function typeLine(line, delay = 18) {
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
    if (idx < enhancedLogLines.length) {
      typeLine(enhancedLogLines[idx]);
      idx++;
      const nextDelay = Math.random() * 500 + 200;
      setTimeout(run, nextDelay);
    } else {
      if (callback) callback();
    }
    output.scrollTop = output.scrollHeight;
  }

  run();
}
