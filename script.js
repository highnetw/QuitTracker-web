// 금주 시작일 (여기에 직접 입력!)
const quitDate = '2025-11-22';

// 경과 일수 계산
function calculateDays() {
    const start = new Date(quitDate);
    const today = new Date();
    const diff = today - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/* 주석 처리된 localStorage 코드는 그대로 유지 */

// 일수 표시
const days = calculateDays();
document.getElementById('days1').textContent = days;
document.getElementById('days2').textContent = days;
document.getElementById('days3').textContent = days;

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