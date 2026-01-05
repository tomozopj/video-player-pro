document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const player = document.getElementById('player');
        player.src = url;
        player.play();
    }
});