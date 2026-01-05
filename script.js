document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const player = document.getElementById('player');

    if (file) {
        console.log("ファイルを受け取りました:", file.name);
        
        // 古いURLがあれば解放（メモリ節約）
        if (player.src) {
            URL.revokeObjectURL(player.src);
        }

        const url = URL.createObjectURL(file);
        player.src = url;

        // 動画の読み込みを強制
        player.load();
        
        // 準備ができたら再生
        player.oncanplay = () => {
            console.log("再生準備完了");
            player.play();
        };
    }
});