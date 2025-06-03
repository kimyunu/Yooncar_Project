// drive_sim.js

// 1) 13초 후 해킹 로그 화면으로 자동 이동
setTimeout(() => {
  window.location.href = "/infection_sim";
}, 13000);

// 2) 속도 랜덤 변화 (80~150 km/h)
function randomizeSpeed() {
  const speedValue = document.getElementById('speed-value');
  if (!speedValue) return;
  let newSpeed = Math.floor(Math.random() * 70) + 80; // 80~149
  speedValue.textContent = newSpeed;
}
setInterval(randomizeSpeed, 1000);

// 3) 위치 텍스트 랜덤 변경 (주요 POI)
const locations = [
  "서울특별시 강남구 테헤란로",
  "서울특별시 송파구 올림픽대로",
  "서울특별시 강남구 삼성역 인근",
  "서울특별시 송파구 잠실로",
  "서울특별시 강남구 논현로",
  "서울특별시 강남구 청담동 근처"
];
function randomizeLocation() {
  const locText = document.getElementById('location-text');
  if (!locText) return;
  const pick = locations[Math.floor(Math.random() * locations.length)];
  locText.textContent = pick;
}
setInterval(randomizeLocation, 3000);

// 4) 센서 오류 이벤트 (5~10초 임의 발생) → 화면 상단 팝업 알람
function sensorErrorEvent() {
  const rand = Math.random() * 5000 + 5000; // 5~10초
  setTimeout(() => {
    // 화면 상단에 경고 배너 생성
    const banner = document.createElement('div');
    banner.textContent = "⚠️ 센서 오류 감지: LiDAR 데이터 불안정";
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.left = "0";
    banner.style.width = "100%";
    banner.style.background = "#FFCC00";
    banner.style.color = "#000";
    banner.style.padding = "10px";
    banner.style.fontFamily = "Segoe UI, sans-serif";
    banner.style.fontSize = "16px";
    banner.style.textAlign = "center";
    banner.style.zIndex = "100";
    document.body.appendChild(banner);

    setTimeout(() => {
      document.body.removeChild(banner);
    }, 3000);

    // 다음 오류 이벤트 대기
    sensorErrorEvent();
  }, rand);
}
document.addEventListener('DOMContentLoaded', () => {
  sensorErrorEvent();
});
