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