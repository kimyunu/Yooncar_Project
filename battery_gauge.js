// battery_gauge.js
// 배터리 SOC % 및 온도 게이지 애니메이션

function updateBatteryGauge() {
    const batteryFill = document.getElementById('battery-fill');
    const batteryText = document.getElementById('battery-text');
    if (!batteryFill || !batteryText) return;

    // SOC: 60%~100% 사이를 랜덤하게 변화 (충분히 높은 상태로 유지되다가 해킹 후 급격히 ↓)
    let soc = Math.floor(Math.random() * 40) + 60; // 60~100
    batteryFill.style.width = soc + '%';
    batteryText.textContent = soc + '% SOC';

    setTimeout(updateBatteryGauge, 1000);
}

function updateTempGauge() {
    const tempFill = document.getElementById('temp-fill');
    const tempText = document.getElementById('temp-text');
    if (!tempFill || !tempText) return;

    // 온도: 25°C~40°C를 유지하다가 해킹 징후 시 60°C~90°C로 상승
    let temp = Math.floor(Math.random() * 15) + 25; // 25~40
    tempFill.style.width = ((temp - 20) / 80 * 100) + '%'; 
    tempText.textContent = temp + '°C';

    setTimeout(updateTempGauge, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
    updateBatteryGauge();
    updateTempGauge();
});
