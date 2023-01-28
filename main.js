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
    }else{
        alert ('is offline')
    }
}

if (navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage("skipWaiting");
}
if (navigator.serviceWorker.controller) {
  navigator.serviceWorker.oncontrollerchange = function() {
      if (confirm("New version available. Reload?")) {
          window.location.reload();
      }
  };
}
