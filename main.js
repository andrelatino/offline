if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js');
  });
}
window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);

function updateIndicator() {
    if (!navigator.onLine) {
        document.getElementById("offline-message").style.display = "block";
    } else {
        document.getElementById("offline-message").style.display = "none";
    }
}
