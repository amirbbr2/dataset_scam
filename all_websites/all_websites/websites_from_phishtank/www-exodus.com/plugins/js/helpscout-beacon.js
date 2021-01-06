setTimeout(() => {
  // prettier-ignore
  !(function(e,t,n){function a(){var e=t.getElementsByTagName('script')[0],n=t.createElement('script');(n.type='text/javascript'),(n.async=!0),(n.src='https://beacon-v2.helpscout.net'),e.parentNode.insertBefore(n,e)}if(((e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})}),(n.readyQueue=[]),'complete'===t.readyState)){return a()}e.attachEvent?e.attachEvent('onload',a):e.addEventListener('load',a,!1)})(window,document,window.Beacon||function(){});
  // prettier-ignore
  window.Beacon('init',window.innerWidth>480?'c51aef4b-77b3-467d-97b5-03247e577e11':'c016caac-a1c0-40aa-859c-f7788b482904');
}, 3000)
