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
            console.log("音量:", Math.round(player.volume * 100) + "%");
            break;
        case 'ArrowDown': // 音量を下げる (10%刻み)
            e.preventDefault();
            // 0以下にならないように制御
            player.volume = Math.max(player.volume - 0.1, 0);
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
            console.log("再生速度:", player.playbackRate + "x");
            break;
        case 'BracketLeft': // 「[」キーで減速
            player.playbackRate = Math.max(player.playbackRate - 0.25, 0.5);
            console.log("再生速度:", player.playbackRate + "x");
            break;
        }
});