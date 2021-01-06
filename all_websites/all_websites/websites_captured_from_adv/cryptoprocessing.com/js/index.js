window.addEventListener('load', () => {

  if (window.innerWidth > 991) {
    setScreensBlocksHigh();
    fixedScreen();
    iconAnimation();
    setTeamCardHeight();
  } else {
    mobileMenu();
    rebuildWalletBlocks();
    rebuildFooter();
  }

  cursorEffect();

  fixPartnersCardHeight();

  tabs();

  cards();

  darkTheme();

});

function darkTheme() {
  let darkBlocks = document.body.querySelectorAll('.dark');
  let logo = document.body.querySelector('.logo img');
  let screenHeight = window.innerHeight;

  let varK = 2;
  if (document.body.querySelector('.wallet-screen')) {
    varK = 2.3;
  }

  if (!darkBlocks.length) {
    return;
  }

  let darkBlocksTop = [];
  let darkBlocksHeight = [];
  let i = 0;

  darkBlocks.forEach(block => {
    let val = block.offsetTop;
    // let height = window.getComputedStyle(block).height;
    let height = block.offsetHeight;

    darkBlocksTop.push(val);
    darkBlocksHeight.push(height);
  });

  darkBlocksTop.forEach((val, ind) => {
    if ((window.pageYOffset > val - screenHeight / 2) && (window.pageYOffset < val + darkBlocksHeight[ind] - screenHeight / 2)) {
      document.body.classList.add('dark-theme');
      logo.setAttribute('src', '/images/logo-dark.svg');
    }
  });

  // console.log(darkBlocksTop);
  // console.log(darkBlocksHeight);

  window.addEventListener('scroll', () => {

    let val0 = darkBlocks[0].offsetTop;
    // let height = window.getComputedStyle(block).height;
    let height0 = darkBlocks[0].offsetHeight;

    darkBlocksTop[0] = val0;
    darkBlocksHeight[0] = height0;

    if (window.pageYOffset < darkBlocksTop[i] - screenHeight / varK) {
      // console.log('yo2');
      if (i > 0) {
        i--;
      }

      // console.log(darkBlocksTop[i] + darkBlocksHeight[i]);
      // console.log(darkBlocksTop[i + 1]);

      if (window.pageYOffset < darkBlocksTop[0] - screenHeight / varK) {
        if (document.body.classList.contains('dark-theme')) {
          document.body.classList.remove('dark-theme');
          logo.setAttribute('src', '/images/logo.svg');
        }
      }

      // if (!(darkBlocksTop[i] + darkBlocksHeight[i]) === darkBlocksTop[i + 1]) {
      //   document.body.classList.remove('dark-theme');
      //   logo.setAttribute('src', '/images/logo.svg');
      // }

      // document.body.classList.remove('dark-theme');
      // logo.setAttribute('src', '/images/logo.svg');

    } else if ((window.pageYOffset > darkBlocksTop[i] - screenHeight / varK) && (window.pageYOffset < darkBlocksTop[i] + darkBlocksHeight[i] - screenHeight / varK)) {
      document.body.classList.add('dark-theme');
      logo.setAttribute('src', '/images/logo-dark.svg')
    } else {
      if (i < darkBlocksTop.length) {
        i++;
      }

      // console.log(darkBlocksTop[i - 1] + darkBlocksHeight[i - 1]);
      // console.log(darkBlocksTop[i]);

      if (!(darkBlocksTop[i - 1] + darkBlocksHeight[i - 1]) === darkBlocksTop[i]) {
        document.body.classList.remove('dark-theme');
        logo.setAttribute('src', '/images/logo.svg');
      }
    }
  });

}

function fixPartnersCardHeight() {
  let partnersCards = document.body.querySelectorAll('.active .partner-card');

  if(partnersCards.length) {
    partnersCards.forEach(card => {
      // console.log(card.offsetWidth);
      card.style.height = `${card.offsetWidth}px`;
    })
  }
}

function setTeamCardHeight() {
  let cards = document.body.querySelectorAll('.team-card');

  if (cards.length) {
    let cardHeight = cards[0].offsetHeight;
    let newHeight = cardHeight - 48;

    cards.forEach(card => {
      card.style.height = `${newHeight}px`;
    });
  }
}

function cards() {
  let navigation = document.body.querySelector('.cards .cards-navigation');

  if (!navigation) {
    return;
  }

  navigation.addEventListener('click', (e) => {

    if (e.target.classList.contains('card-btn')) {
      let oldCard = document.body.querySelector('.card.active ');

      let newCard = e.target;

      oldCard.classList.toggle('active');

      let nextCard = newCard.getAttribute('dataTarget');

      document.getElementById(nextCard).classList.toggle('active');
    }
  });
}

function tabs() {
  let tabsNavigation = document.body.querySelector('.tabs .tabs-list');
  if (!tabsNavigation) {
    return
  }

  let index = null;
  let allTabs = document.body.querySelectorAll('.tabs .tabs-list .tab');

  tabsNavigation.addEventListener('click', (e) => {
    if(e.target.classList.contains('tab')) {

      let innd = +e.target.getAttribute('dataId');

      toggleTab(e.target, innd);
    }
  });



  let controlArrows = document.body.querySelector('.tabs-and-arrows .custom-slider-arrows');
  if (controlArrows) {
    controlArrows.addEventListener('click', (e) => {

      allTabs.forEach((tab, ind) => {
        if (tab.classList.contains('active')) {
          index = ind;
        }
      });

      if (e.target.classList.contains('custom-next-arrow')) {
        if (index < allTabs.length - 1) {
          toggleTab(allTabs[index + 1], index + 1);
        }
      } else {
        if (index > 0) {
          toggleTab(allTabs[index - 1], index - 1);
        }
      }
    })
  }

  function toggleTab(node, index) {
    // index--;
    if (index === allTabs.length - 1) {
      document.body.querySelector('.tabs-and-arrows .custom-slider-arrows .custom-next-arrow').classList.add('slick-disabled');
      document.body.querySelector('.tabs-and-arrows .custom-slider-arrows .custom-prev-arrow').classList.remove('slick-disabled');
    } else if (index === 0) {
      document.body.querySelector('.tabs-and-arrows .custom-slider-arrows .custom-prev-arrow').classList.add('slick-disabled');
      document.body.querySelector('.tabs-and-arrows .custom-slider-arrows .custom-next-arrow').classList.remove('slick-disabled');
    } else {
      document.body.querySelector('.tabs-and-arrows .custom-slider-arrows .custom-prev-arrow').classList.remove('slick-disabled');
      document.body.querySelector('.tabs-and-arrows .custom-slider-arrows .custom-next-arrow').classList.remove('slick-disabled');
    }

    tabsNavigation.querySelector('.active').classList.toggle('active');
    node.classList.toggle('active');
    let contentId = node.getAttribute('dataTarget');
    let prevTab = document.body.querySelector('.tab-content.active');
    prevTab.classList.toggle('active');
    let newTab = document.getElementById(contentId);
    newTab.classList.toggle('active');

    let partnersCards = document.body.querySelectorAll('.active .partner-card');
    if(partnersCards.length) {
      partnersCards.forEach(card => {
        card.style.height = `${card.offsetWidth}px`;
      })
    }
  }
}

function mobileMenu() {
  // let langBtn = document.body.querySelector('.lang a');
  // langBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   document.body.querySelector('.lang').classList.toggle('.opened');
  //
  //   document.body.addEventListener('click', clickOut);
  // });

  // langBtn.addEventListener('click', langHandler);
  let body = document.body.querySelector('.header');

  $('.mobile-menu-btn').click(function(e) {
    $('.mobile-menu-btn i').toggleClass('fa-times');

    if (!$('.header .buttons .white-btn').hasClass('opened')) {
      document.body.style.overflow = 'hidden';
      $('.header .buttons .white-btn').toggleClass('opened');

    } else {
      document.body.style.overflow = 'visible';
      $('.header .buttons .white-btn').toggleClass('opened');
    }

    $('.header').toggleClass('opened');
    $('.main-menu').slideToggle().clearQueue();
  });

  function langHandler() {
    event.preventDefault();
    document.body.querySelector('.lang').classList.toggle('.opened');
    body.addEventListener('click', clickOut);
    // langBtn.removeEventListener('click', langHandler);
  }

  function clickOut() {
    event.preventDefault();
    // console.log('yo');
    document.body.querySelector('.lang').classList.toggle('.opened');
    body.removeEventListener('click', clickOut);
  }

  // if (document.body.classList.contains('front')) {
  //   window.addEventListener('scroll', () => {
  //     if (window.pageYOffset < 76) {
  //       body.style.marginTop =`${76 - window.pageYOffset}px`;
  //     } else {
  //       body.style.marginTop = 0;
  //     }
  //   })
  // }
}

function setScreensBlocksHigh() {
  // let screenHeight = window.innerHeight;
  // let screenBlocks = document.body.querySelectorAll('.intro, .wallet-screen, .about-us-screen, .become-partner-page');
  // // console.log(screenBlocks);
  // screenBlocks.forEach(block => {
  //   block.style.height = `${screenHeight - 128}px`;
  // })
}

function rebuildFooter() {
  let description = document.body.querySelectorAll('.footer .about-company .regular-text');
  description.forEach(p => {
    document.body.querySelector('.footer .menus-and-contacts').appendChild(p);
  });

  let followUs = document.body.querySelector('.footer .follow-us-block');
  document.body.querySelector('.footer .menus-and-contacts .menu-region').appendChild(followUs);
}

function cursorEffect() {
  let cursorEl = document.body.querySelector('.cursor-effect');

  if (!cursorEl) {
    return;
  }

  let values = ['iGaming', 'eSports', 'Streaming', 'eCommerce', 'PSP'];

  setInterval(() => {
    cursorEl.classList.toggle('cursor');
  }, 500);

  deleteWord();

  let i = 0;
  let j = 0;
  let newText = '';


  function deleteWord() {
    let timer = setInterval(() => {
      if (cursorEl.innerText.length > 0) {

        let text = cursorEl.innerText;
        text = text.slice(0, -1);
        cursorEl.innerText = text;

      } else {
        clearInterval(timer);

        i++;
        if (i >= values.length) {
          i = 0;
        }

        setTimeout(() => {
          writeWord();
        }, 800);

      }
    }, 80)
  }

  function writeWord() {
    let timer = setInterval(() => {
      let newWord = values[i];
      newText += newWord[j];
      cursorEl.innerText = newText;
      j++;

      if (j >= newWord.length) {
        clearInterval(timer);
        j = 0;
        newText = '';
        setTimeout(() => {
          deleteWord();
        }, 800);
      }
    },80);
  }

}

function fixedScreen() {
  let fixed = document.body.querySelector('.fixed-screen');
  let screenHeight = window.innerHeight;


  if (!fixed) {
    return
  }

  // if (window.innerWidth < 1366) {
  //   let screens = document.body.querySelectorAll('.about-us-screen');
  //   screenHeight = screens[2].querySelector('.container').offsetTop - 128;
  // }

  if(fixed.classList.contains('advantages')) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > screenHeight) {
        fixed.style.position = 'absolute';
        fixed.style.top = `${screenHeight}px`;
      } else {
        fixed.style.position = 'fixed';
        fixed.style.top = '0px';
      }
    });
    return;
  }

  let allDescImages = fixed.querySelectorAll('.desc-tab-img img');
  let allMobImages = fixed.querySelectorAll('.mob-tab-img img');
  let deviceContainers = document.body.querySelectorAll('.device-container');

  window.addEventListener('scroll', () => {
    // console.log(window.pageYOffset);
    if (window.pageYOffset > screenHeight * 3) {
      fixed.style.position = 'absolute';
      fixed.style.top = `${screenHeight * 3}px`;
    } else {
      fixed.style.position = 'fixed';
      fixed.style.top = '0px';

      let k = window.pageYOffset / screenHeight;

      if (k < 0.5) {
        allDescImages[0].style.opacity = 1;
        allDescImages[1].style.opacity = 0;

        allMobImages[0].style.opacity = 1;
        allMobImages[1].style.opacity = 0;
      } else if (k > 0.5 && k < 1.5) {
        allDescImages[0].style.opacity = 0;
        allDescImages[1].style.opacity = 1;
        allDescImages[2].style.opacity = 0;

        allMobImages[0].style.opacity = 0;
        allMobImages[1].style.opacity = 1;
        allMobImages[2].style.opacity = 0;
      } else if (k > 1.5 && k < 2.5) {
        allDescImages[1].style.opacity = 0;
        allDescImages[2].style.opacity = 1;
        allDescImages[3].style.opacity = 0;

        allMobImages[1].style.opacity = 0;
        allMobImages[2].style.opacity = 1;
        allMobImages[3].style.opacity = 0;
        
        deviceContainers.forEach(cont => {
          cont.style.backgroundColor = 'white';
        })
      } else if (k > 2.5) {
        allDescImages[1].style.opacity = 0;
        allDescImages[2].style.opacity = 0;
        allDescImages[3].style.opacity = 1;

        allMobImages[1].style.opacity = 0;
        allMobImages[2].style.opacity = 0;
        allMobImages[3].style.opacity = 1;

        deviceContainers.forEach(cont => {
          cont.style.backgroundColor = '#191E21';
        })
      }
    }
  });
}

function rebuildWalletBlocks() {
  let blocks = document.body.querySelectorAll('.rebuild');

  if (!blocks.length) {
    return;
  }

  blocks.forEach( block => {
    let images = block.querySelector('.wallet-screen-img');
    block.querySelector('.wallet-screen-description').insertBefore(images, block.querySelector('.addition-text'));
  })
}

function iconAnimation() {
  let w1 = document.body.querySelectorAll('.w1');
  let w2 = document.body.querySelectorAll('.w2');
  let w3 = document.body.querySelectorAll('.w3');
  setInterval(() => {
    w1.forEach(icon => {
      icon.classList.toggle('up');

      if (icon.classList.contains('up')) {
        icon.style.top = `${icon.offsetTop - 8}px`;
      } else {
        icon.style.top = `${icon.offsetTop + 8}px`;
      }

    })
  }, 1000);

  setInterval(() => {
    w2.forEach(icon => {
      icon.classList.toggle('up');

      if (icon.classList.contains('up')) {
        icon.style.top = `${icon.offsetTop - 8}px`;
      } else {
        icon.style.top = `${icon.offsetTop + 8}px`;
      }

    })
  }, 1500);

  setTimeout(() => {
    setInterval(() => {
      w3.forEach(icon => {
        icon.classList.toggle('up');

        if (icon.classList.contains('up')) {
          icon.style.top = `${icon.offsetTop - 8}px`;
        } else {
          icon.style.top = `${icon.offsetTop + 8}px`;
        }
      })
    }, 1000);
  }, 500)
}




$('.customers-slider').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  prevArrow: $('.customers-about-us .custom-prev-arrow.customers-slider-arrow'),
  nextArrow: $('.customers-about-us .custom-next-arrow.customers-slider-arrow'),
  responsive: [
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        infinite: true,
        arrows: false,
        centerMode: true,
        centerPadding: '20px',
        slidesToShow: 1,
      }
    }
  ]
});

$('.media-slider').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: $('.media .custom-prev-arrow.customers-slider-arrow'),
  nextArrow: $('.media .custom-next-arrow.customers-slider-arrow'),
  responsive: [
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        infinite: true,
        arrows: false,
        centerMode: true,
        centerPadding: '20px',
        slidesToShow: 1,
      }
    }
  ]
});
