// 금주 시작일 (여기에 직접 입력!)
const quitDate = '2025-11-22';

// 경과 개월/일수 계산 (달력 기준: 예- 11/22 시작 -> 다음달 22일이 1개월)
function calculateElapsed() {
    const start = new Date(quitDate);
    start.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let months = (today.getFullYear() - start.getFullYear()) * 12
        + (today.getMonth() - start.getMonth());

    let anniversary = new Date(start);
    anniversary.setMonth(start.getMonth() + months);

    if (anniversary > today) {
        months -= 1;
        anniversary = new Date(start);
        anniversary.setMonth(start.getMonth() + months);
    }

    const days = Math.floor((today - anniversary) / (1000 * 60 * 60 * 24));
    return { months, days };
}

function formatElapsed({ months, days }) {
    return months > 0 ? `${months}개월 ${days}일째` : `${days}일째`;
}

/* 주석 처리된 localStorage 코드는 그대로 유지 */

// 경과 기간 표시
const elapsedText = formatElapsed(calculateElapsed());
document.getElementById('days1').textContent = elapsedText;
document.getElementById('days2').textContent = elapsedText;
document.getElementById('days3').textContent = elapsedText;

// 페이지 전환
let currentPage = 1;
const totalPages = 4;

function showPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page' + pageNum).classList.add('active');
}

// 화면 클릭으로 페이지 전환 (안드로이드 앱처럼)
document.querySelector('.container').addEventListener('click', () => {
    currentPage = currentPage < totalPages ? currentPage + 1 : 1;
    showPage(currentPage);
});

/* 기존 버튼 이벤트 주석 처리
document.getElementById('prevBtn').addEventListener('click', () => {
    currentPage = currentPage > 1 ? currentPage - 1 : totalPages;
    showPage(currentPage);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage = currentPage < totalPages ? currentPage + 1 : 1;
    showPage(currentPage);
});
*/

// 키보드 화살표로도 전환 가능
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentPage = currentPage > 1 ? currentPage - 1 : totalPages;
        showPage(currentPage);
    } else if (e.key === 'ArrowRight') {
        currentPage = currentPage < totalPages ? currentPage + 1 : 1;
        showPage(currentPage);
    }
});

// 스와이프 지원 (모바일)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        currentPage = currentPage < totalPages ? currentPage + 1 : 1;
        showPage(currentPage);
    }
    if (touchEndX > touchStartX + 50) {
        currentPage = currentPage > 1 ? currentPage - 1 : totalPages;
        showPage(currentPage);
    }
}

// PWA: 서비스 워커 등록 (오프라인 지원 + 홈 화면 설치)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js');
    });
}