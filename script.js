document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // 動画ファイルのURLを作成
        const url = URL.createObjectURL(file);
        const player = document.getElementById('player');
        
        // 動画をセットして再生
        player.src = url;
        player.load(); // 読み込み直し
        player.play().catch(error => {
            console.error("再生エラー:", error);
        });
    }
});