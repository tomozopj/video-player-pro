// ARM Video Player Pro - Background Service Worker
// 拡張機能アイコンがクリックされたときに player.html を新しいタブで開く

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('player.html')
    });
});
