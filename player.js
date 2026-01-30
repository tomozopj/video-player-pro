// ARM Video Player Pro - Main Script
const player = document.getElementById('player');
const seekBar = document.getElementById('seekBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationTimeDisplay = document.getElementById('durationTime');
const osd = document.getElementById('osd');
const videoContainer = document.querySelector('.video-container');
const fileInput = document.getElementById('fileInput');
const selectFileBtn = document.getElementById('selectFileBtn');
const fileSelectOverlay = document.getElementById('fileSelectOverlay');
let osdTimeout;

// ファイル選択ボタンのクリックイベント
selectFileBtn.addEventListener('click', () => {
    fileInput.click();
});

// ファイル選択処理
fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        if (player.src) URL.revokeObjectURL(player.src);
        const url = URL.createObjectURL(file);
        player.src = url;
        player.load();
        player.play();
        // ファイル選択UIを非表示
        fileSelectOverlay.style.display = 'none';
    }
});

// OSDを表示して自動で消す関数（モダンアニメーション対応）
function showOSD(message) {
    osd.textContent = message;
    osd.classList.remove('show', 'hide');
    requestAnimationFrame(() => {
        osd.classList.add('show');
    });
    if (osdTimeout) clearTimeout(osdTimeout);
    osdTimeout = setTimeout(() => {
        osd.classList.remove('show');
        osd.classList.add('hide');
    }, 1500);
}

// 時間（秒）を "分:秒" の形式に変換する関数
function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// キーボード操作（JIS/US配列両対応のためe.keyを使用）
document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    // 再生速度変更（e.keyで判定）
    if (e.key === ']') {
        player.playbackRate = Math.min(player.playbackRate + 0.25, 2.0);
        showOSD(`⚡ ${player.playbackRate.toFixed(2)}x`);
        return;
    }

    if (e.key === '[') {
        player.playbackRate = Math.max(player.playbackRate - 0.25, 0.5);
        showOSD(`⚡ ${player.playbackRate.toFixed(2)}x`);
        return;
    }

    // e.codeでの判定（特殊キー）
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            player.paused ? player.play() : player.pause();
            break;
        case 'ArrowRight':
            player.currentTime += 5;
            showOSD(`Seek: ${formatTime(player.currentTime)}`);
            break;
        case 'ArrowLeft':
            player.currentTime -= 5;
            showOSD(`Seek: ${formatTime(player.currentTime)}`);
            break;
        case 'ArrowUp':
            e.preventDefault();
            player.volume = Math.min(player.volume + 0.1, 1);
            showOSD(`Volume: ${Math.round(player.volume * 100)}%`);
            break;
        case 'ArrowDown':
            e.preventDefault();
            player.volume = Math.max(player.volume - 0.1, 0);
            showOSD(`Volume: ${Math.round(player.volume * 100)}%`);
            break;
    }

    // 英字キーは e.key で判定（大文字小文字両対応）
    const key = e.key.toLowerCase();

    if (key === 'p') { // ピクチャーインピクチャー
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
            player.requestPictureInPicture();
        }
    } else if (key === 'f') { // 全画面切り替え
        e.preventDefault();
        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen().catch(err => {
                console.error('全画面表示に失敗:', err);
                showOSD('全画面エラー');
            });
            showOSD('全画面');
        } else {
            document.exitFullscreen();
            showOSD('全画面解除');
        }
    }
});

// シークバー制御
player.addEventListener('loadedmetadata', () => {
    seekBar.max = player.duration;
    durationTimeDisplay.textContent = formatTime(player.duration);
});

player.addEventListener('timeupdate', () => {
    if (!seekBar.matches(':active')) {
        seekBar.value = player.currentTime;
    }
    currentTimeDisplay.textContent = formatTime(player.currentTime);
});

seekBar.addEventListener('input', () => {
    player.currentTime = seekBar.value;
});

// クリック/ダブルクリック処理
let clickTimer = null;

player.addEventListener('click', (e) => {
    if (clickTimer !== null) {
        clearTimeout(clickTimer);
        clickTimer = null;
        return;
    }

    clickTimer = setTimeout(() => {
        clickTimer = null;
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    }, 200);
});

player.addEventListener('play', () => {
    showOSD('▶');
});

player.addEventListener('pause', () => {
    showOSD('⏸');
});

// ダブルクリックで全画面切り替え
player.addEventListener('dblclick', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (clickTimer !== null) {
        clearTimeout(clickTimer);
        clickTimer = null;
    }

    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            console.error('全画面表示に失敗:', err);
            showOSD('全画面エラー');
        });
        showOSD('全画面');
    } else {
        document.exitFullscreen();
        showOSD('全画面解除');
    }
});
