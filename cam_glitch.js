// cam_glitch.js
// 카메라 피드 패널 위에 글리치 오버레이를 무작위로 토글

function startCameraGlitch() {
    const glitchElem = document.querySelectorAll('.camera-glitch');
    if (!glitchElem.length) return;

    glitchElem.forEach(el => {
        function toggleGlitch() {
            // 5~15초마다 한 번씩 글리치 ON/OFF
            const delay = Math.random() * 10000 + 5000;
            setTimeout(() => {
                el.style.opacity = 0.8; 
                // 0.2~0.7초 동안 퍼뜨리다가 사라짐
                setTimeout(() => {
                    el.style.opacity = 0;
                    toggleGlitch();
                }, Math.random() * 500 + 200);
            }, delay);
        }
        toggleGlitch();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    startCameraGlitch();
});
