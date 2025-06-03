// traffic_sim.js
// “네트워크 트래픽”을 실시간으로 시뮬레이션용 Canvas 시각화

const canvas = document.getElementById('traffic-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
    if (!canvas) return;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 가상의 트래픽 데이터(Upload, Download)
let trafficData = [];
const MAX_POINTS = 50;

function addRandomTrafficPoint() {
    // 초당 랜덤 업/다운로드 값 (0~100 Mbps)
    const up = Math.random() * 100;
    const down = Math.random() * 100;
    if (trafficData.length >= MAX_POINTS) trafficData.shift();
    trafficData.push({ up, down });
}

function drawTrafficGraph() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    // 배경
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);
    // 그래프 그리기
    const barWidth = width / MAX_POINTS;
    for (let i = 0; i < trafficData.length; i++) {
        const x = i * barWidth;
        // 다운로드 바 (초록색)
        const downHeight = (trafficData[i].down / 100) * height;
        ctx.fillStyle = '#28A745';
        ctx.fillRect(x, height - downHeight, barWidth - 2, downHeight);
        // 업로드 바 (파란색)
        const upHeight = (trafficData[i].up / 100) * height;
        ctx.fillStyle = '#007BFF';
        ctx.fillRect(x, height - upHeight, barWidth - 2, upHeight);
    }
}

function updateTraffic() {
    addRandomTrafficPoint();
    drawTrafficGraph();
    setTimeout(updateTraffic, 500); // 0.5초마다 갱신
}

// 페이지 로드 시 자동 시작
if (canvas) {
    updateTraffic();
}
