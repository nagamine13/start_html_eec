// JavaScript Document


/*----------------------------------------
  onload event
------------------------------------------*/
/**
 * ページロード時のアニメーション制御
 * 
 * 使い方:
 * HTML要素に data-onload 属性を追加すると、ロード後にclass="load_open"を追加する
 * load_openクラスを持つ要素はアニメーションを実行するよう、cssで設定する
 * 
 * <div data-onload="quick">ロード後即座にclass="load_open"を追加</div>
 * <div data-onload="main">ロード後400ms後にclass="load_open"を追加</div>
 * <div data-onload="delay">ロード後600ms後にclass="load_open"を追加</div>
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    openClass: 'load_open',
    timing: { quick: 0, main: 400, delay: 600 }
  };

  function initOnloadAnimations() {

    // data-onload属性を持つ要素をタイプ別に取得
    const elements = {
      quick: document.querySelectorAll('[data-onload="quick"]'),
      main: document.querySelectorAll('[data-onload="main"]'),
      delay: document.querySelectorAll('[data-onload="delay"]')
    };

    // 各タイプごとにアニメーション実行
    Object.entries(elements).forEach(([type, nodeList]) => {
      if (nodeList.length === 0) return;
      setTimeout(() => {
        nodeList.forEach(el => el.classList.add(CONFIG.openClass));
      }, CONFIG.timing[type]);
    });
  }

  // ページロード時に実行
  window.addEventListener('load', initOnloadAnimations);
})();

/*----------------------------------------
  global nav
------------------------------------------*/
/**
 * グローバルナビゲーション制御
 * 
 * 使い方:
 * 
 * 【メインナビの開閉】
 * <button data-nav="nav_trigger">トリガーボタン</button>
 * <nav data-nav="global_nav">ナビゲーション本体</nav>
 * <div data-nav="global_nav_overlay">オーバーレイ（任意）</div>
 * 
 * トリガークリック、オーバーレイクリック、ナビ内のアンカーリンククリックで開閉
 * 開閉時にclass="active"を追加/削除
 * 
 * 【サブナビのホバー表示】
 * <li data-nav="sub_nav_open">
 *   <a>親メニュー</a>
 *   <ul>サブメニュー</ul>
 * </li>
 * 
 * ホバー時に最初と最後の子要素にclass="active"を追加
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    activeClass: 'active',
    scrollClass: 'scroll_on'
  };
  
  // 要素取得
  const elements = {
    triggers: document.querySelectorAll('[data-nav="nav_trigger"]'),
    navs: document.querySelectorAll('[data-nav="global_nav"]'),
    overlay: document.querySelector('[data-nav="global_nav_overlay"]'),
    subNavs: document.querySelectorAll('[data-nav="sub_nav_open"]')
  };

  function toggleNav() {
    elements.triggers.forEach(el => el.classList.toggle(CONFIG.activeClass));
    elements.navs.forEach(el => el.classList.toggle(CONFIG.activeClass));
    document.body.classList.toggle(CONFIG.scrollClass);
    elements.overlay?.classList.toggle(CONFIG.activeClass);
  }
  
  // ナビを閉じる
  function closeNav() {
    elements.triggers.forEach(el => el.classList.remove(CONFIG.activeClass));
    elements.navs.forEach(el => el.classList.remove(CONFIG.activeClass));
    document.body.classList.add(CONFIG.scrollClass);
    elements.overlay?.classList.remove(CONFIG.activeClass);
  }
  
  // トリガーボタンのクリックイベント
  elements.triggers.forEach(trigger => {
    trigger.addEventListener('click', toggleNav);
  });
  
  // ナビ内のアンカーリンククリック時に閉じる
  elements.navs.forEach(nav => {
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        closeNav();
      }
    });
  });
  
  // オーバーレイクリックで閉じる
  elements.overlay?.addEventListener('click', closeNav);
  
  // サブナビのホバー制御
  elements.subNavs.forEach(subNav => {
    subNav.addEventListener('mouseover', () => {
      subNav.firstElementChild?.classList.add(CONFIG.activeClass);
      subNav.lastElementChild?.classList.add(CONFIG.activeClass);
    });
    subNav.addEventListener('mouseout', () => {
      subNav.firstElementChild?.classList.remove(CONFIG.activeClass);
      subNav.lastElementChild?.classList.remove(CONFIG.activeClass);
    });
  });
  
})();

/*----------------------------------------
  scroll reveal
------------------------------------------*/
/**
 * スクロール連動アニメーション制御
 * 
 * 使い方:
 * 
 * 【スクロールで要素を表示】
 * <div data-scroll="reveal">スクロールで表示される要素</div>
 * 
 * 要素が画面内に入ったらclass="scroll_in"を追加
 * 画面下部から30%の位置で発火
 * 
 * 【FVのスクロール検知】
 * <div data-scroll="fv_scroll_anim">スクロールトップからスクロールした時に変化する要素</div>
 * 
 * 少しでもスクロールしたらclass="fv_scrolled"を追加
 * スクロールトップに戻るとクラスを削除
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    revealClass: 'scroll_in',
    fvScrolledClass: 'fv_scrolled',
    revealOffset: 0.3 // 画面高さの30%
  };
  
  // 要素取得
  const elements = {
    reveals: document.querySelectorAll('[data-scroll="reveal"]'),
    fvAnims: document.querySelectorAll('[data-scroll="fv_scroll_anim"]')
  };
  
  // スクロールリビール処理
  function handleScrollReveal() {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const offset = windowHeight * CONFIG.revealOffset;
    
    elements.reveals.forEach(target => {
      const targetTop = target.getBoundingClientRect().top + scroll;
      if (scroll > targetTop - windowHeight + offset) {
        target.classList.add(CONFIG.revealClass);
      }
    });
  }
  
  // FVスクロールアニメーション処理
  function handleFvScrollAnim() {
    const scrollAmount = window.scrollY;
    const action = scrollAmount > 0 ? 'add' : 'remove';
    
    elements.fvAnims.forEach(el => {
      el.classList[action](CONFIG.fvScrolledClass);
    });
  }
  
  // スクロールイベント統合
  function onScroll() {
    if (elements.reveals.length > 0) handleScrollReveal();
    if (elements.fvAnims.length > 0) handleFvScrollAnim();
  }
  
  // イベント登録
  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', handleScrollReveal);
  
})();

/*----------------------------------------
  tab change & URL query tab change
------------------------------------------*/
/**
 * タブ切り替え機能（URLクエリ対応、自動再生対応）
 * 
 * 使い方:
 * 
 * 【基本構造】
 * <div data-tab="switch" data-tab_id="tab1">
 *   <button data-tab_name="overview">概要</button>
 *   <button data-tab_name="detail">詳細</button>
 * </div>
 * 
 * <div data-tab="target" data-tab_id="tab1">
 *   <div data-tab_name="overview">概要コンテンツ</div>
 *   <div data-tab_name="detail">詳細コンテンツ</div>
 * </div>
 * 
 * 【自動再生】
 * <div data-tab="switch" data-tab_id="tab1" data-tab_autoplay="5000">
 * data-tab_autoplay に秒数（ミリ秒）を指定すると自動再生
 * 例: 3000 = 3秒ごとに切り替え
 * 
 * 【URLクエリ】
 * ?tab=*data-tab_name* がurl末尾にある場合、*data-tab_name*タブを開いた状態で表示
 * 
 * タブクリック時にclass="active"を追加
 * スイッチとコンテンツはdata-tab_name属性で紐付け
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    activeClass: 'active',
    defaultAutoInterval: 5000,
    langLinkId: 'fixed_lang_change'
  };
  
  // タブ切り替えボックスを取得
  const tabSwitchBoxes = document.querySelectorAll('[data-tab="switch"]');
  
  tabSwitchBoxes.forEach((tabSwitchBox) => {
    const tabId = tabSwitchBox.getAttribute('data-tab_id');
    const targetBox = document.querySelector(`[data-tab="target"][data-tab_id="${tabId}"]`);
    
    if (!targetBox) return;
    
    // スイッチとコンテンツを取得
    const switches = Array.from(tabSwitchBox.children);
    const contents = Array.from(targetBox.children);
    
    // data-tab_name で紐付けマップを作成
    const contentMap = new Map();
    contents.forEach(content => {
      const name = content.getAttribute('data-tab_name');
      if (name) contentMap.set(name, content);
    });
    
    // 自動再生設定を取得
    const autoPlayAttr = tabSwitchBox.getAttribute('data-tab_autoplay');
    const autoInterval = autoPlayAttr ? parseInt(autoPlayAttr, 10) : null;
    const isAutoPlay = autoInterval && autoInterval > 0;
    
    // 状態管理
    let currentTabName = null;
    let autoTimer = null;
    
    // 指定タブに切り替え
    function switchTo(tabName) {
      // 全てを非アクティブ化
      switches.forEach(sw => sw.classList.remove(CONFIG.activeClass));
      contents.forEach(content => content.classList.remove(CONFIG.activeClass));
      
      // 指定タブをアクティブ化
      const targetSwitch = switches.find(sw => 
        sw.getAttribute('data-tab_name') === tabName
      );
      const targetContent = contentMap.get(tabName);
      
      if (targetSwitch && targetContent) {
        targetSwitch.classList.add(CONFIG.activeClass);
        targetContent.classList.add(CONFIG.activeClass);
        currentTabName = tabName;
      }
    }
    
    // 自動再生開始
    function startAutoPlay() {
      if (!isAutoPlay) return;
      
      clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        const currentIndex = switches.findIndex(sw => 
          sw.getAttribute('data-tab_name') === currentTabName
        );
        const nextIndex = (currentIndex + 1) % switches.length;
        const nextTabName = switches[nextIndex].getAttribute('data-tab_name');
        
        if (nextTabName) switchTo(nextTabName);
      }, autoInterval);
    }
    
    // URL更新
    function updateUrl(tabName) {
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('tab', tabName);
      window.history.pushState({}, '', newUrl);
      
      // 言語切替リンクのURLも更新
      const langLink = document.getElementById(CONFIG.langLinkId);
      if (langLink) {
        const baseUrl = langLink.href.split('?')[0];
        langLink.href = `${baseUrl}?tab=${tabName}`;
      }
    }
    
    // 初期表示タブを決定
    function initializeTab() {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      
      // URLパラメータで指定されたタブ、または最初のタブ
      const initialTabName = (tabParam && contentMap.has(tabParam)) 
        ? tabParam 
        : switches[0]?.getAttribute('data-tab_name');
      
      if (initialTabName) {
        switchTo(initialTabName);
        if (isAutoPlay) startAutoPlay();
      }
    }
    
    // クリックイベント登録
    switches.forEach((tabSwitch) => {
      tabSwitch.addEventListener('click', () => {
        const tabName = tabSwitch.getAttribute('data-tab_name');
        if (!tabName) return;
        
        switchTo(tabName);
        updateUrl(tabName);
        
        if (isAutoPlay) startAutoPlay();
      });
    });
    
    // 初期化実行
    initializeTab();
  });
  
})();

/*----------------------------------------
  accordion
------------------------------------------*/
/**
 * アコーディオン開閉機能
 * 
 * 使い方:
 * 
 * 【基本構造】
 * <div data-accordion="box">
 *   <button data-accordion="trigger">開閉ボタン</button>
 *   <div data-accordion="content">開閉するコンテンツ</div>
 * </div>
 * 
 * トリガークリックでコンテンツが開閉
 * 開閉時にトリガーにclass="accordion_active"、コンテンツにclass="accordion_open"を追加
 * 
 * 【複数トリガー・コンテンツ対応】
 * 1つのboxに複数のトリガーとコンテンツがあれば全て連動して開閉
 * 
 * アニメーション: 400ms、cubic-bezier(.63,.08,.47,.99)
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    activeClass: 'accordion_active',
    openClass: 'accordion_open',
    duration: 400,
    easing: 'cubic-bezier(.63,.08,.47,.99)'
  };
  
  // スライドダウン
  function slideDown(el) {
    el.style.display = 'block';
    el.style.height = 'auto';
    const height = el.offsetHeight;
    el.style.height = '0';
    
    el.animate(
      [{ height: '0' }, { height: height + 'px' }],
      { duration: CONFIG.duration, easing: CONFIG.easing }
    );
    
    el.style.height = 'auto';
  }
  
  // スライドアップ
  function slideUp(el) {
    const height = el.offsetHeight;
    el.style.height = height + 'px';
    
    el.animate(
      [{ height: height + 'px' }, { height: '0' }],
      { duration: CONFIG.duration, easing: CONFIG.easing }
    );
    
    setTimeout(() => {
      el.style.height = '0';
    }, CONFIG.duration);
  }
  
  // トグル
  function slideToggle(el) {
    if (el.classList.contains(CONFIG.openClass)) {
      slideUp(el);
    } else {
      slideDown(el);
    }
  }
  
  // アコーディオンボックスを取得
  const accordionBoxes = document.querySelectorAll('[data-accordion="box"]');
  
  accordionBoxes.forEach((box) => {
    const triggers = box.querySelectorAll('[data-accordion="trigger"]');
    const contents = box.querySelectorAll('[data-accordion="content"]');
    
    if (triggers.length === 0 || contents.length === 0) return;
    
    // トリガークリックイベント
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        // 全トリガーのアクティブ状態をトグル
        triggers.forEach(t => t.classList.toggle(CONFIG.activeClass));
        
        // 全コンテンツの開閉をトグル
        contents.forEach(content => {
          slideToggle(content);
          content.classList.toggle(CONFIG.openClass);
        });
      });
    });
  });
  
})();

/*----------------------------------------
  smooth scroll
------------------------------------------*/
/**
 * スムーススクロール機能
 * 
 * 使い方:
 * 
 * 【同一ページ内のスムーススクロール】
 * <a href="#section1">セクション1へ</a>
 * <div id="section1">目的地</div>
 * 
 * クリックで指定要素へスムーススクロール
 * 画面高さの30%の位置に表示
 * 
 * 【別ページからのスムーススクロール】
 * <a href="/page.html" data-hash="section1">別ページのセクション1へ</a>
 * 
 * data-hash属性にターゲットIDを指定
 * ページ遷移後、指定要素へ自動スクロール
 * 画面高さの30%の位置に表示
 * 
 * sessionStorageを使用してページ遷移後もスクロール位置を保持
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    gapRatio: 0.3, // スクロール時のギャップ（画面高さの比率）
    storageKey: 'scrollToHash'
  };
  
  // スムーススクロール実行
  function smoothScrollTo(targetElement) {
    if (!targetElement) return;
    
    const rect = targetElement.getBoundingClientRect().top;
    const offset = window.scrollY;
    const gap = window.innerHeight * CONFIG.gapRatio;
    const target = rect + offset - gap;
    
    window.scrollTo({
      top: target,
      behavior: 'smooth'
    });
  }
  
  // 同一ページ内のアンカーリンク
  function initSamePageScroll() {
    const triggers = document.querySelectorAll('a[href^="#"]');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        
        const href = trigger.getAttribute('href');
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          smoothScrollTo(targetElement);
        }
      });
    });
  }
  
  // 別ページへのハッシュリンク
  function initCrossPageHashLinks() {
    const hashLinks = document.querySelectorAll('a[data-hash]');
    
    hashLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const hash = link.getAttribute('data-hash');
        sessionStorage.setItem(CONFIG.storageKey, hash);
        window.location.href = link.href;
      });
    });
  }
  
  // ページロード時のハッシュスクロール処理
  function handleHashOnLoad() {
    const storedHash = sessionStorage.getItem(CONFIG.storageKey);
    
    if (storedHash) {
      const targetElement = document.getElementById(storedHash);
      
      if (targetElement) {
        smoothScrollTo(targetElement);
      }
      
      sessionStorage.removeItem(CONFIG.storageKey);
    }
  }
  
  // 初期化
  initSamePageScroll();
  initCrossPageHashLinks();
  
  // ページロード時の処理
  window.addEventListener('load', handleHashOnLoad);
  
})();

/*----------------------------------------
  click link
------------------------------------------*/
/**
 * クリック領域の拡張
 * 
 * 使い方:
 * 
 * <div data-click_link_click_point="link1">
 *   クリック可能エリア
 *   <a data-click_link_end_point="link1" href="/page.html">実際のリンク</a>
 * </div>
 * 
 * click_point をクリックすると対応する end_point のクリックを実行
 * カード全体をクリック可能にする場合などに便利
 */

(function() {
  'use strict';
  
  function initClickLinkExtension() {
    const clickPoints = document.querySelectorAll('[data-click_link_click_point]');
    
    clickPoints.forEach(clickPoint => {
      clickPoint.addEventListener('click', (e) => {
        e.preventDefault();
        
        const linkId = clickPoint.getAttribute('data-click_link_click_point');
        if (!linkId) return;
        
        const endPoint = document.querySelector(`[data-click_link_end_point="${linkId}"]`);
        if (endPoint) {
          endPoint.click();
        }
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', initClickLinkExtension);
  
})();

/*----------------------------------------
  vh vw
------------------------------------------*/
/**
 * viewport単位のCSS変数管理
 * 
 * 使い方:
 * 
 * 【CSS変数】
 * --vh: 数値のみ（例: 800）
 * --vw: 数値のみ（例: 1200）
 * --vh_px: px付き（例: 800px）
 * --vw_px: px付き（例: 1200px）
 * --vh_px_even: 偶数に丸めたpx（例: 800px）
 * --vw_px_even: 偶数に丸めたpx（例: 1200px）
 * 
 * 【CSS例】
 * height: calc(var(--vh_px) * 0.5); // 50vh相当
 * width: var(--vw_px_even); // 偶数幅
 * 
 * モバイルのアドレスバー表示/非表示でvhが変わる問題に対応
 * リサイズ時は幅が100px以上変わった場合のみ更新（パフォーマンス最適化）
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    resizeThreshold: 100 // リサイズ検知の閾値（px）
  };
  
  // 前回の幅を保持
  let previousWindowWidth = window.innerWidth;
  
  // viewport単位のCSS変数を設定
  function setViewportVariables() {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const root = document.documentElement;
    
    root.style.setProperty('--vh', `${vh}`);
    root.style.setProperty('--vw', `${vw}`);
    root.style.setProperty('--vh_px', `${vh}px`);
    root.style.setProperty('--vw_px', `${vw}px`);
  }
  
  // 偶数に丸めたviewport単位のCSS変数を設定
  function setEvenViewportVariables() {
    const vhEven = Math.ceil(window.innerHeight / 2) * 2;
    const vwEven = Math.ceil(window.innerWidth / 2) * 2;
    const root = document.documentElement;
    
    root.style.setProperty('--vh_px_even', `${vhEven}px`);
    root.style.setProperty('--vw_px_even', `${vwEven}px`);
  }
  
  // 全ての変数を更新
  function updateAllVariables() {
    setViewportVariables();
    setEvenViewportVariables();
  }
  
  // リサイズハンドラー
  function handleResize() {
    const currentWindowWidth = window.innerWidth;
    const widthDiff = Math.abs(currentWindowWidth - previousWindowWidth);
    
    // 幅が閾値以上変わった場合のみ更新
    if (widthDiff > CONFIG.resizeThreshold) {
      setViewportVariables();
      previousWindowWidth = currentWindowWidth;
    }
    
    // 偶数変数は常に更新
    setEvenViewportVariables();
  }
  
  // 初期化
  updateAllVariables();
  
  // リサイズイベント
  window.addEventListener('resize', handleResize);
  
})();

/*----------------------------------------
  span slice
------------------------------------------*/
/**
 * テキストを1文字ずつspan要素で囲む
 * 
 * 使い方:
 * 
 * <h1 data-dom_custom="span_slice">Hello World</h1>
 * 
 * 実行後:
 * <h1 data-dom_custom="span_slice">
 *   <span>H</span><span>e</span><span>l</span><span>l</span><span>o</span>
 *   <span>&nbsp;</span>
 *   <span>W</span><span>o</span><span>r</span><span>l</span><span>d</span>
 * </h1>
 * 
 * 各文字にCSSアニメーションを適用する場合に便利
 * brタグや他の要素もそのまま保持
 */

(function() {
  'use strict';
  
  function initSpanSlice() {
    const elements = document.querySelectorAll('[data-dom_custom="span_slice"]');
    
    elements.forEach(element => {
      const originalContents = Array.from(element.childNodes);
      element.innerHTML = '';
      
      originalContents.forEach(node => {
        // テキストノードの場合、1文字ずつspanで囲む
        if (node.nodeType === Node.TEXT_NODE) {
          Array.from(node.textContent).forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // スペースは&nbsp;に
            if (char === ' ') {
              span.innerHTML = '&nbsp;';
            }
            element.appendChild(span);
          });
        }
        // brタグはそのまま保持
        else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
          element.appendChild(node.cloneNode());
        }
        // その他の要素もそのまま保持
        else {
          element.appendChild(node.cloneNode(true));
        }
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', initSpanSlice);
  
})();

/*----------------------------------------
  x scroll
------------------------------------------*/
/**
 * 横スクロールエリアの縦ホイール対応
 * 
 * 使い方:
 * 
 * <div data-scroll="x_scroll_area">
 *   <!-- 横スクロールコンテンツ -->
 * </div>
 * 
 * CSS: overflow-x: scroll; を設定
 * 
 * 縦方向のホイール操作で横スクロールを実行
 * スクロール速度は40%に調整
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    scrollSpeed: 0.4 // ホイール速度の倍率
  };
  
  function initHorizontalScroll() {
    const xScrollElements = document.querySelectorAll('[data-scroll="x_scroll_area"]');
    
    xScrollElements.forEach(element => {
      element.addEventListener('wheel', (e) => {
        // 横方向のホイール操作はそのまま
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
        
        e.preventDefault();
        element.scrollLeft += e.deltaY * CONFIG.scrollSpeed;
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', initHorizontalScroll);
  
})();

/*----------------------------------------
  ios style
------------------------------------------*/
/**
 * iOS端末向けスタイル適用
 * 
 * 使い方:
 * 
 * 【iOS専用スタイルを適用したい要素】
 * <div data-style="ios_style_point">iOS端末でのみclass="ios_style"が追加される</div>
 * 
 * 【リンクボタンへの自動適用】
 * <a class="link_btn">iOS端末でclass="ios_style"が自動追加</a>
 * <a class="link_btn jp">日本語クラス付きは除外される</a>
 * 
 * iOS判定: iPhone, iPad, iPod
 * ページロード時に判定してクラスを追加
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    iosClass: 'ios_style',
    linkBtnSelector: '.link_btn:not(.jp)'
  };
  
  // iOS判定
  function isIOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
  
  // iOSスタイル適用
  function applyIOSStyle() {
    if (!isIOS()) return;
    
    // data-style="ios_style_point" を持つ要素
    const iosStylePoints = document.querySelectorAll('[data-style="ios_style_point"]');
    iosStylePoints.forEach(el => el.classList.add(CONFIG.iosClass));
    
    // リンクボタン（.jp クラスを除く）
    const linkBtns = document.querySelectorAll(CONFIG.linkBtnSelector);
    linkBtns.forEach(el => el.classList.add(CONFIG.iosClass));
  }
  
  // ページロード時に実行
  window.addEventListener('load', applyIOSStyle);
  
})();

/*----------------------------------------
  iframe youtube
------------------------------------------*/
/**
 * YouTube iframe 自動検出とスタイル適用
 * 
 * 使い方:
 * 
 * 【自動適用】
 * <iframe src="https://www.youtube.com/embed/..." title="YouTube video player"></iframe>
 * 
 * title属性に"YouTube"を含むiframeに自動でclass="mod_youtube_iframe_size"を追加
 * またはsrc属性にyoutube.comを含むiframeも検出
 * 
 * 手動でクラスを付ける必要なし
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    youtubeClass: 'mod_youtube_iframe_size'
  };
  
  // YouTube iframe 判定
  function isYouTubeIframe(iframe) {
    const title = iframe.title || '';
    const src = iframe.src || '';
    
    return title.toLowerCase().includes('youtube') || 
           src.includes('youtube.com');
  }
  
  // YouTube iframe にクラス追加
  function applyYouTubeStyle() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
      if (isYouTubeIframe(iframe)) {
        iframe.classList.add(CONFIG.youtubeClass);
      }
    });
  }
  
  // ページロード時に実行
  window.addEventListener('load', applyYouTubeStyle);
  
})();

/*----------------------------------------
  img dl disable
------------------------------------------*/
/**
 * 画像の右クリック保存を無効化
 * 
 * 使い方:
 * 
 * 全てのimg要素に自動適用
 * <img src="image.jpg" alt="保護される画像">
 * 
 * 右クリックメニューを無効化して画像の保存を防止
 */

(function() {
  'use strict';
  
  function disableImageContextMenu() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', disableImageContextMenu);
  
})();

/*----------------------------------------
  auto scroll animation
------------------------------------------*/
/**
 * 背景画像の自動スクロールアニメーション
 * 
 * 使い方:
 * 
 * <div 
 *   data-auto-scroll-animation="vertical" 
 *   data-auto-scroll-animation-duration="10s"
 *   style="background-image: url('pattern.jpg'); background-size: contain; background-repeat: repeat-x / repeat-y">
 * </div>
 * 
 * 【direction の種類】
 * vertical: 上から下へスクロール
 * vertical_reverse: 下から上へスクロール
 * horizontal: 左から右へスクロール
 * horizontal_reverse: 右から左へスクロール
 * 
 * 【duration】
 * デフォルト: 10s
 * 例: 5s, 20s, 30s など
 * 
 * 画像サイズに応じて自動的にアニメーション距離を計算
 * リサイズ時も自動で再計算（50px以上の変化で発火）
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    defaultDuration: '10s',
    resizeThreshold: 50, // リサイズ検知の閾値（px）
    resizeDebounce: 250 // リサイズイベントの遅延（ms）
  };
  
  function initAutoScrollAnimation() {
    const elements = document.querySelectorAll('[data-auto-scroll-animation]');
    
    elements.forEach(el => {
      const style = getComputedStyle(el);
      const backgroundImageURL = style.backgroundImage.slice(5, -2);
      
      if (!backgroundImageURL) return;
      
      const img = new Image();
      img.src = backgroundImageURL;
      
      let resizeTimer;
      let lastWidth = window.innerWidth;
      let lastHeight = window.innerHeight;
      let currentStyleSheet = null;
      
      // アニメーション更新
      function updateAnimation() {
        const direction = el.dataset.autoScrollAnimation;
        const duration = el.dataset.autoScrollAnimationDuration || CONFIG.defaultDuration;
        const elementWidth = parseFloat(style.width);
        const elementHeight = parseFloat(style.height);
        
        let fromPosition, toPosition;
        const animName = `scroll-${direction}-${duration.replace('.', '_')}`;
        
        // 方向別の位置計算
        if (direction === 'vertical') {
          const imgHeight = Math.round(elementWidth / img.width * img.height);
          fromPosition = '0px 0px';
          toPosition = `0px ${imgHeight}px`;
        } else if (direction === 'vertical_reverse') {
          const imgHeight = Math.round(elementWidth / img.width * img.height);
          fromPosition = `0px ${imgHeight}px`;
          toPosition = '0px 0px';
        } else if (direction === 'horizontal') {
          const imgWidth = Math.round(elementHeight / img.height * img.width);
          fromPosition = '0px 0px';
          toPosition = `${imgWidth}px 0px`;
        } else if (direction === 'horizontal_reverse') {
          const imgWidth = Math.round(elementHeight / img.height * img.width);
          fromPosition = `${imgWidth}px 0px`;
          toPosition = '0px 0px';
        } else {
          return;
        }
        
        // 既存のスタイルシートを削除
        if (currentStyleSheet) {
          currentStyleSheet.remove();
        }
        
        // 新しいアニメーションを追加
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
          @keyframes ${animName} {
            from { background-position: ${fromPosition}; }
            to { background-position: ${toPosition}; }
          }
          [data-auto-scroll-animation="${direction}"][data-auto-scroll-animation-duration="${duration}"] {
            animation: ${animName} ${duration} linear infinite;
          }
        `;
        document.head.appendChild(styleSheet);
        currentStyleSheet = styleSheet;
      }
      
      // リサイズハンドラー
      function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const currentWidth = window.innerWidth;
          const currentHeight = window.innerHeight;
          const widthDiff = Math.abs(currentWidth - lastWidth);
          const heightDiff = Math.abs(currentHeight - lastHeight);
          
          if (widthDiff > CONFIG.resizeThreshold || heightDiff > CONFIG.resizeThreshold) {
            lastWidth = currentWidth;
            lastHeight = currentHeight;
            updateAnimation();
          }
        }, CONFIG.resizeDebounce);
      }
      
      // 画像読み込み完了時に初期化
      img.onload = updateAnimation;
      
      // リサイズイベント
      window.addEventListener('resize', handleResize);
    });
  }
  
  document.addEventListener('DOMContentLoaded', initAutoScrollAnimation);
  
})();

/*----------------------------------------
  swiper
------------------------------------------*/
/**
 * Swiper初期化ヘルパー関数
 * 
 * 使い方:
 * 
 * 【HTML構造】
 * <div class="swiper-container swiper1">
 *   <div class="swiper-wrapper">
 *     <!----- slide ------>
 *      <div class="swiper-slide">
 *        <div class="slide_inner">
 *        </div>
 *      </div>
 *      <!----- slide ------>
 *      <!----- slide ------>
 *      <div class="swiper-slide">
 *        <div class="slide_inner">
 *        </div>
 *      </div>
 *      <!----- slide ------>
 *   </div>
 *   <div class="swiper_controller swiper1-swiper-controller">
 *     <div class="swiper-button-prev swiper1-swiper-button-prev"></div>
 *     <div class="swiper-pagination swiper1-swiper-pagination"></div>
 *     <div class="swiper-scrollbar swiper1-swiper-scrollbar"></div>
 *     <div class="swiper-button-next swiper1-swiper-button-next"></div>
 *   </div>
 * </div>
 * 
 * 【シンプルな使用】
 * const swiper1 = createSwiper('swiper1');
 * 
 * 【カスタム設定】
 * const swiper2 = createSwiper('swiper2', {
 *   slidesPerView: 3,
 *   autoplay: { delay: 3000 }
 * });
 * 
 * スライドが1枚以下の場合、自動的にループ・ナビゲーションを無効化
 * コントローラー要素（{className}-swiper-controller）にclass="disactive"を追加
 */

(function() {
  'use strict';
  
  // デフォルト設定
  const DEFAULT_CONFIG = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    loopAdditionalSlides: 2,
    effect: 'slide',
    spaceBetween: window.innerWidth * 0.02,
    roundLengths: true,
    watchOverflow: true,
    speed: 500,
    autoplay: { delay: 6000 }
  };
  
  const SINGLE_SLIDE_CONFIG = {
    loop: false,
    pagination: false,
    navigation: false,
    scrollbar: false
  };
  
  /**
   * 単一のSwiperインスタンスを作成
   * @param {string} className - Swiperコンテナのクラス名
   * @param {Object} customOptions - カスタム設定
   * @returns {Swiper|null} Swiperインスタンスまたはnull
   */
  function createSwiper(className, customOptions = {}) {
    // Swiperの存在チェック
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper is not loaded. Skipping Swiper initialization.');
      return null;
    }
    
    const container = document.querySelector(`.${className}`);
    
    if (!container) {
      console.warn(`Swiper container .${className} not found`);
      return null;
    }
    
    const slides = container.querySelectorAll('.swiper-slide');
    const isSingleSlide = slides.length <= 1;
    
    // ナビゲーション・ページネーション・スクロールバーの設定
    const uiOptions = {
      pagination: {
        el: `.${className}-swiper-pagination`,
        clickable: true
      },
      navigation: {
        nextEl: `.${className}-swiper-button-next`,
        prevEl: `.${className}-swiper-button-prev`
      },
      scrollbar: {
        el: `.${className}-swiper-scrollbar`,
        draggable: true
      }
    };
    
    // 最終的な設定をマージ
    let finalOptions;
    
    if (isSingleSlide) {
      // コントローラーにdisactiveクラスを追加
      const controller = document.querySelector(`.${className}-swiper-controller`);
      if (controller) {
        controller.classList.add('disactive');
      }
      
      finalOptions = {
        ...DEFAULT_CONFIG,
        ...SINGLE_SLIDE_CONFIG,
        ...customOptions
      };
    } else {
      finalOptions = {
        ...DEFAULT_CONFIG,
        ...uiOptions,
        ...customOptions
      };
    }
    
    // Swiperインスタンスを作成して返す
    return new Swiper(`.${className}`, finalOptions);
  }
  
  // グローバルに公開
  window.createSwiper = createSwiper;
  
})();

// 使用例
// シンプルな使用
// const swiper1 = createSwiper('swiper1');

// カスタム設定での使用
// const swiper2 = createSwiper('swiper2', {
//   slidesPerView: 3,
//   autoplay: { delay: 3000 }
// });


/*----------------------------------------
  modal
------------------------------------------*/
/**
 * モーダル機能（複数タイプ対応）
 * 
 * 使い方:
 * 
 * 【1. 汎用モノモーダル】
 * <button data-modal="mono_modal_open" data-mono_modal_target_id="modal1">開く</button>
 * <div class="cmn_modal_layer" data-mono_modal_id="modal1">
 *   <div class="modal_bg" data-modal="modal_close_element"></div>
 *   <div class="modal_inner">コンテンツ</div>
 *   <div class="modal_close_btn" data-modal="modal_close_element"></div>
 * </div>
 * 
 * 【2. 画像モーダル（自動生成）】
 * <img data-modal="img_mono_modal_trigger" src="image.jpg" alt="">
 * 画像をクリックするとモーダルで拡大表示（自動でモーダル要素を生成）
 * 
 * 【3. YouTubeモーダル】
 * <button data-modal="youtube_mono_modal_open" data-youtube_modal_target_id="yt1">動画を見る</button>
 * <div class="cmn_modal_layer" data-youtube_modal_id="yt1">
 *   <div class="modal_bg" data-modal="modal_close_element"></div>
 *   <div class="modal_inner">
 *     <div class="modal_youtube_video_box" youtubeid="VIDEO_ID">
 *       <img src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" alt="">
 *     </div>
 *   </div>
 *   <div class="modal_close_btn" data-modal="modal_close_element"></div>
 * </div>
 * 
 * 【4. スライドモーダル（ギャラリー）】
 * <div data-modal="slide_modal_open_box" data-slide_modal_target_id="gallery1">
 *   <img data-modal="slide_modal_open" src="thumb1.jpg" alt="">
 *   <img data-modal="slide_modal_open" src="thumb2.jpg" alt="">
 * </div>
 * <div class="cmn_modal_layer" data-slide_modal_id="gallery1">
 *   <div class="modal_bg" data-modal="modal_close_element"></div>
 *   <div class="modal_inner">
 *     <div data-modal="slide_modal_content"><img data-src="image1.jpg" alt=""></div>
 *     <div data-modal="slide_modal_content"><img data-src="image2.jpg" alt=""></div>
 *   </div>
 *   <div data-modal="modal_prev_element">◀</div>
 *   <div data-modal="modal_next_element">▶</div>
 *   <div class="modal_close_btn" data-modal="modal_close_element"></div>
 * </div>
 * 
 * 矢印キー（←→）でスライド操作可能
 * 
 * 全モーダル共通:
 * - 開いた状態でclass="visible"を追加
 * - data-modal="modal_close_element"でモーダルを閉じる
 */

(function() {
  'use strict';
  
  // 設定
  const CONFIG = {
    visibleClass: 'visible',
    slideVisibleClass: 'slide_visible',
    playClass: 'play'
  };
  
  // YouTube動画の埋め込み/削除
  function replaceToYouTubeIframe(container) {
    const youtubeId = container.getAttribute('youtubeid');
    if (!youtubeId) return;
    
    const iframe = `<iframe class="youtube_player" youtubeid="${youtubeId}" src="https://www.youtube.com/embed/${youtubeId}?playsinline=1&enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe>`;
    container.innerHTML = iframe;
    container.classList.add(CONFIG.playClass);
  }
  
  function replaceToYouTubeThumbnail(container) {
    const youtubeId = container.getAttribute('youtubeid');
    if (!youtubeId) return;
    
    const thumbnail = `<img src="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" alt="YouTube thumbnail">`;
    container.innerHTML = thumbnail;
    container.classList.remove(CONFIG.playClass);
  }
  
  // 1. 汎用モノモーダル
  function initMonoModal() {
    const triggers = document.querySelectorAll('[data-modal="mono_modal_open"]');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-mono_modal_target_id');
        const targetModal = document.querySelector(`[data-mono_modal_id="${targetId}"]`);
        
        if (targetModal) {
          targetModal.classList.add(CONFIG.visibleClass);
        }
      });
    });
  }
  
  // 2. 画像モーダル（自動生成）
  function initImageMonoModal() {
    const images = document.querySelectorAll('[data-modal="img_mono_modal_trigger"]');
    
    images.forEach(image => {
      const imageSrc = image.getAttribute('src');
      const modalHTML = `
        <div data-modal="img_mono_modal_open" class="cmn_img_mono_modal_trigger">
          <img src="${imageSrc}" alt="modal open">
        </div>
        <div class="cmn_modal_layer">
          <div class="modal_bg" data-modal="modal_close_element"></div>
          <div class="modal_inner">
            <img src="${imageSrc}" class="img_mono_modal_content" alt="">
          </div>
          <div class="modal_close_btn" data-modal="modal_close_element"></div>
        </div>
      `;
      
      const fragment = document.createRange().createContextualFragment(modalHTML);
      image.parentNode.replaceChild(fragment, image);
    });
    
    // 生成されたトリガーにイベント設定
    const generatedTriggers = document.querySelectorAll('[data-modal="img_mono_modal_open"]');
    generatedTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetModal = trigger.nextElementSibling;
        if (targetModal) {
          targetModal.classList.add(CONFIG.visibleClass);
        }
      });
    });
  }
  
  // 3. YouTubeモーダル
  function initYouTubeModal() {
    const triggers = document.querySelectorAll('[data-modal="youtube_mono_modal_open"]');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-youtube_modal_target_id');
        const targetModal = document.querySelector(`[data-youtube_modal_id="${targetId}"]`);
        
        if (targetModal) {
          targetModal.classList.add(CONFIG.visibleClass);
          const videoBox = targetModal.querySelector('.modal_youtube_video_box');
          if (videoBox) {
            replaceToYouTubeIframe(videoBox);
          }
        }
      });
    });
  }
  
  // 4. スライドモーダル
  function initSlideModal() {
    const openBoxes = document.querySelectorAll('[data-modal="slide_modal_open_box"]');
    
    openBoxes.forEach(openBox => {
      const targetId = openBox.getAttribute('data-slide_modal_target_id');
      const modalLayer = document.querySelector(`[data-slide_modal_id="${targetId}"]`);
      
      if (!modalLayer) return;
      
      const triggers = openBox.querySelectorAll('[data-modal="slide_modal_open"]');
      const contents = modalLayer.querySelectorAll('[data-modal="slide_modal_content"]');
      const images = modalLayer.querySelectorAll('img[data-src]');
      const prevBtn = modalLayer.querySelector('[data-modal="modal_prev_element"]');
      const nextBtn = modalLayer.querySelector('[data-modal="modal_next_element"]');
      
      // スライド移動関数
      function moveSlide(direction) {
        const visibleContent = modalLayer.querySelector(`.${CONFIG.slideVisibleClass}`);
        if (!visibleContent) return;
        
        const contentsArray = Array.from(contents);
        const currentIndex = contentsArray.indexOf(visibleContent);
        let nextIndex;
        
        if (direction === 'next') {
          nextIndex = (currentIndex + 1) % contents.length;
        } else {
          nextIndex = (currentIndex - 1 + contents.length) % contents.length;
        }
        
        contents.forEach(content => content.classList.remove(CONFIG.slideVisibleClass));
        contents[nextIndex].classList.add(CONFIG.slideVisibleClass);
      }
      
      // トリガークリックで開く
      triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
          // data-src から src に画像を読み込み
          images.forEach(image => {
            const dataSrc = image.getAttribute('data-src');
            if (dataSrc) {
              image.setAttribute('src', dataSrc);
            }
          });
          
          modalLayer.classList.add(CONFIG.visibleClass);
          contents.forEach(content => content.classList.remove(CONFIG.slideVisibleClass));
          contents[index].classList.add(CONFIG.slideVisibleClass);
        });
      });
      
      // 前へ・次へボタン
      if (prevBtn) {
        prevBtn.addEventListener('click', () => moveSlide('prev'));
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => moveSlide('next'));
      }
      
      // キーボード操作
      document.addEventListener('keydown', (e) => {
        if (!modalLayer.classList.contains(CONFIG.visibleClass)) return;
        
        if (e.code === 'ArrowLeft') {
          moveSlide('prev');
        } else if (e.code === 'ArrowRight') {
          moveSlide('next');
        }
      });
    });
  }
  
  // モーダルを閉じる
  function initModalClose() {
    const closeElements = document.querySelectorAll('[data-modal="modal_close_element"]');
    const modalLayers = document.querySelectorAll('.cmn_modal_layer');
    
    closeElements.forEach(closeElement => {
      closeElement.addEventListener('click', () => {
        // 全モーダルを閉じる
        modalLayers.forEach(layer => {
          layer.classList.remove(CONFIG.visibleClass);
        });
        
        // スライドモーダルのスライド表示をリセット
        const slideContents = document.querySelectorAll('[data-modal="slide_modal_content"]');
        slideContents.forEach(content => {
          content.classList.remove(CONFIG.slideVisibleClass);
        });
        
        // YouTube動画をサムネイルに戻す
        const youtubeBoxes = document.querySelectorAll('.modal_youtube_video_box');
        youtubeBoxes.forEach(box => {
          replaceToYouTubeThumbnail(box);
        });
      });
    });
  }
  
  // 初期化
  function init() {
    initMonoModal();
    initImageMonoModal();
    initYouTubeModal();
    initSlideModal();
    initModalClose();
  }
  
  // DOM読み込み後に実行
  document.addEventListener('DOMContentLoaded', init);
  
})();