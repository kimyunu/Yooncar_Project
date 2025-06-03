/**
 * simulation_overlay.js
 * - 각 시뮬레이션 단계에서 Plain-Language 요약 패널의 
 *   단계별 문구를 순차적으로 보여주는 기능
 * - drive_simulation 단계 후, infection_sim 단계 전까지
 */

let summarySteps = []; // 페이지별로 JS 내에서 초기화됨
let currentStep = 0;

function showNextSummary() {
    if (currentStep >= summarySteps.length) return;
    const panel = document.getElementById('summary-panel');
    panel.textContent = summarySteps[currentStep];
    panel.style.opacity = '1';

    // 5초 후에는 서서히 사라지고 다음으로 넘어감
    setTimeout(() => {
        panel.style.transition = 'opacity 0.5s';
        panel.style.opacity = '0';
        currentStep++;
        setTimeout(showNextSummary, 1000);
    }, 5000);
}

// drive_simulation.html에서 호출: 단순 주행 요약
function initDriveSummary() {
    summarySteps = [
        "현재 차량은 송파구 잠실로를 향해 120km/h로 주행 중입니다.",
        "LiDAR·레이더·카메라 등 모든 센서가 정상 작동 중입니다.",
        "배터리 BMS (Battery Management System)도 안정적으로 관리되고 있습니다."
    ];
    currentStep = 0;
    showNextSummary();
}

// cyber_infection_sim.html에서 호출: 초기 해킹 요약
function initInfectionSummary() {
    summarySteps = [
        "배터리 BMS가 해킹되어 셀 온도 센서가 80°C로 왜곡되었습니다.",
        "LiDAR가 스푸핑되어 차량이 가상의 장애물을 인식하고 있습니다.",
        "현재 AI 자율주행 제어권이 외부 공격자에게 전부 넘어간 상태입니다."
    ];
    currentStep = 0;
    showNextSummary();
}

// cyber_infection_enhanced.html에서 호출: 심화 해킹 요약
function initEnhancedSummary() {
    summarySteps = [
        "실제로 배터리 셀 온도가 145°C까지 상승하고 있습니다.",
        "냉각 팬이 강제로 우회되어 냉각 기능이 완전히 상실되었습니다.",
        "열폭주가 곧 발생할 예정이며, 차량은 곧 폭발합니다."
    ];
    currentStep = 0;
    showNextSummary();
}
