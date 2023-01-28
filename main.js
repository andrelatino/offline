if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js');
  });
}
window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);

function updateIndicator() {
    if (navigator.onLine) {
        alert ('is online')
    }
    if (!navigator.onLine) {
      alert ('is offline')
  } 
}
