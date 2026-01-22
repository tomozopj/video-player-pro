document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const player = document.getElementById('player');

    if (file) {
        if (player.src) URL.revokeObjectURL(player.src);
        const url = URL.createObjectURL(file);
        player.src = url;
        player.style.display = 'block';
        player.load();
        player.play();
    }
});
// キーボード操作の追加
document.addEventListener('keydown', (e) => {
    const player = document.getElementById('player');
    if (!player.src) return; // 動画がないときは何もしない

    switch (e.code) {
        case 'Space': // スペースキーで再生・一時停止
            e.preventDefault(); // 画面スクロールを防止
            player.paused ? player.play() : player.pause();
            break;
        case 'ArrowRight': // 右キーで5秒進む
            player.currentTime += 5;
            break;
        case 'ArrowLeft': // 左キーで5秒戻る
            player.currentTime -= 5;
            break;
        case 'ArrowUp': // 音量を上げる (10%刻み)
            e.preventDefault(); // 画面がスクロールしてしまうのを防ぐ
            // 1以上にならないように制御
            player.volume = Math.min(player.volume + 0.1, 1);
            showOSD(`Volume: ${Math.round(player.volume * 100)}%`); // ★追加
            console.log("音量:", Math.round(player.volume * 100) + "%");
            break;
        case 'ArrowDown': // 音量を下げる (10%刻み)
            e.preventDefault();
            // 0以下にならないように制御
            player.volume = Math.max(player.volume - 0.1, 0);
            showOSD(`Volume: ${Math.round(player.volume * 100)}%`); // ★追加
            console.log("音量:", Math.round(player.volume * 100) + "%");
            break;
        case 'KeyP': // Pキーでピクチャー・イン・ピクチャー
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                player.requestPictureInPicture();
            }
            break;
        case 'BracketRight': // 「]」キーで加速
            player.playbackRate = Math.min(player.playbackRate + 0.25, 2.0);
            showOSD(`Speed: ${player.playbackRate}x`); // ★追加
            console.log("再生速度:", player.playbackRate + "x");
            break;
        case 'BracketLeft': // 「[」キーで減速
            player.playbackRate = Math.max(player.playbackRate - 0.25, 0.5);
            showOSD(`Speed: ${player.playbackRate}x`); // ★追加
            console.log("再生速度:", player.playbackRate + "x");
            break;
        }
});
// ▼▼▼ シークバー制御の追加コード ▼▼▼

const seekBar = document.getElementById('seekBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationTimeDisplay = document.getElementById('durationTime');
const osd = document.getElementById('osd');
let osdTimeout;

// OSDを表示して自動で消す関数
function showOSD(message) {
    osd.textContent = message;
    osd.style.opacity = '1';
    
    // 既存のタイマーをリセット
    if (osdTimeout) clearTimeout(osdTimeout);
    
    // 1.5秒後にフェードアウト
    osdTimeout = setTimeout(() => {
        osd.style.opacity = '0';
    }, 1500);
}

// 1. 動画の長さを取得してバーの最大値を設定
player.addEventListener('loadedmetadata', () => {
    seekBar.max = player.duration;
    durationTimeDisplay.textContent = formatTime(player.duration);
});

// 2. 再生位置に合わせてバーと時間を更新
player.addEventListener('timeupdate', () => {
    // ユーザーがバーを操作している間は、バーの自動更新を止める（カクつき防止）
    if (!seekBar.matches(':active')) {
        seekBar.value = player.currentTime;
    }
    currentTimeDisplay.textContent = formatTime(player.currentTime);
});

// 3. バーをドラッグした時に再生位置を変更（シーク）
seekBar.addEventListener('input', () => {
    player.currentTime = seekBar.value;
});

// 時間（秒）を "分:秒" の形式に変換する関数
function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}