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
        case 'KeyF': // Fキーで全画面（サイドパネル内）
            if (player.requestFullscreen) player.requestFullscreen();
            break;
    }
});