(function(window) {
  let blackerStyleEl;
  let d = document;
  let h = d.head;
  let w = window;

  let hide = false;

  function Preloader() {
    this.id =
      'ld' +
      Math.random()
        .toString(36)
        .substring(7);
  }

  Preloader.prototype.show = function() {
    hide = false;

    let insertLoader = function insertLoader() {
      if (hide) return;

      if (!this.loaderElement) {
        if (blackerStyleEl && blackerStyleEl.parentNode) {
          blackerStyleEl.parentNode.removeChild(blackerStyleEl);
          blackerStyleEl = null;
        }

        d.body.insertAdjacentHTML('afterbegin', loaderInner);
        this.loaderElement = d.getElementById(this.id);
        setTimeout(
          function() {
            if (!this.loaderElement) {
              this.loaderElement = d.getElementById(this.id);
            }
          }.bind(this)
        );
      }
    }.bind(this);

    let loaderInner = `<div class="loader" id="${this.id}"><div class="loader-inner" id="loader"><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div><div class="loader-line-wrap"><div class="loader-line"></div></div></div></div>`;
    let styleInner = `.loader#${this.id} {  background: #000;  background: radial-gradient(#222, #000);  bottom: 0;  left: 0;  overflow: hidden;  position: fixed;  right: 0;  top: 0;  z-index: 99999;  }  #${this.id} .loader-inner {  bottom: 0;  height: 60px;  left: 0;  margin: auto;  position: absolute;  right: 0;  top: 0;  width: 100px;  }  #${this.id} .loader-line-wrap {  -webkit-animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;  animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;  box-sizing: border-box;  height: 50px;  left: 0;  overflow: hidden;  position: absolute;  top: 0;  -webkit-transform-origin: 50% 100%;  transform-origin: 50% 100%;  width: 100px;  }  #${this.id} .loader-line {  border: 4px solid transparent;  border-radius: 100%;  box-sizing: border-box;  height: 100px;  left: 0;  margin: 0 auto;  position: absolute;  right: 0;  top: 0;  width: 100px;  }  #${this.id} .loader-line-wrap:nth-child(1) { -webkit-animation-delay: -50ms; animation-delay: -50ms; }  #${this.id} .loader-line-wrap:nth-child(2) { -webkit-animation-delay: -100ms; animation-delay: -100ms; }  #${this.id} .loader-line-wrap:nth-child(3) { -webkit-animation-delay: -150ms; animation-delay: -150ms; }  #${this.id} .loader-line-wrap:nth-child(4) { -webkit-animation-delay: -200ms; animation-delay: -200ms; }  #${this.id} .loader-line-wrap:nth-child(5) { -webkit-animation-delay: -250ms; animation-delay: -250ms; }  #${this.id} .loader-line-wrap:nth-child(1) .loader-line {  border-color: hsl(0, 80%, 60%);  height: 90px;  width: 90px;  top: 7px;  }  #${this.id} .loader-line-wrap:nth-child(2) .loader-line {  border-color: hsl(60, 80%, 60%);  height: 76px;  width: 76px;  top: 14px;  }  #${this.id} .loader-line-wrap:nth-child(3) .loader-line {  border-color: hsl(120, 80%, 60%);  height: 62px;  width: 62px;  top: 21px;  }  #${this.id} .loader-line-wrap:nth-child(4) .loader-line {  border-color: hsl(180, 80%, 60%);  height: 48px;  width: 48px;  top: 28px;  }  #${this.id} .loader-line-wrap:nth-child(5) .loader-line {  border-color: hsl(240, 80%, 60%);  height: 34px;  width: 34px;  top: 35px;  }  @-webkit-keyframes spin { 0%, 15% {  -webkit-transform: rotate(0);  transform: rotate(0);  } 100% {  -webkit-transform: rotate(360deg);  transform: rotate(360deg);  } }  @keyframes spin { 0%, 15% {  -webkit-transform: rotate(0);  transform: rotate(0);  } 100% {  -webkit-transform: rotate(360deg);  transform: rotate(360deg);  } }</style>`;
    let blackerStyleInner = `html { background: black!important; opacity: 0!important } `;

    if (!this.styleElement) {
      let stEl = d.createElement('style');
      stEl.innerHTML = styleInner;
      h.appendChild(stEl);
      this.styleElement = stEl;
    }

    if (!blackerStyleEl) {
      blackerStyleEl = d.createElement('style');
      blackerStyleEl.innerHTML = blackerStyleInner;
      h.appendChild(blackerStyleEl);
      this.styleElement = blackerStyleEl;
    }

    if (d.readyState === 'interactive' || d.readyState === 'complete') {
      insertLoader();
    } else {
      d.addEventListener('DOMContentLoaded', insertLoader);
    }

    let intervalId = setInterval(function() {
      if (d.body) {
        insertLoader();
        clearInterval(intervalId);
      }
    });
  };

  Preloader.prototype.hide = function() {
    hide = true;

    if (this.loaderElement && this.loaderElement.parentNode) {
      this.loaderElement.parentNode.removeChild(this.loaderElement);
      this.loaderElement = null;
    }

    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }
  };

  if (!w.BD_PRELOADER) {
    w.BD_PRELOADER = new Preloader();
    w.BD_PRELOADER.show();
  }
})(window);
