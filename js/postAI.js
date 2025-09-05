/* PostAI */

(function () {
  function postAI(dom) {
    function insertAIBox() {
      removeExistingAIBox();
      // 获取目标元素
      let AIbox = document.createElement("div");
      AIbox.className = "postAI-box";
      // 插入 SVG 图标
      let icon = `<svg t="1714137053863" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7326" width="200" height="200">
        <path d="M541.866667 761.002667a107.136 107.136 0 0 1-68.608-24.874667c1.152-0.597333 2.304-1.28 3.413333-1.92l114.048-65.877333a18.56 18.56 0 0 0 9.386667-16.128v-160.896l48.213333 27.818666a1.706667 1.706667 0 0 1 0.938667 1.322667v133.205333a107.52 107.52 0 0 1-107.264 107.349334H541.866667z" p-id="7327" fill="#000000"></path>
        <path d="M298.538667 590.506667a107.136 107.136 0 0 0 105.813333 125.568 107.52 107.52 0 0 0 53.632-14.336l115.285333-66.56a1.706667 1.706667 0 0 0 0.725334-1.365334v-55.808l-139.264 80.426667a18.56 18.56 0 0 1-18.773334 0l-114.048-65.877333-3.413333-2.005334z" p-id="7328" fill="#000000"></path>
        <path d="M337.194667 366.378667a107.008 107.008 0 0 0-55.893334 47.104 107.434667 107.434667 0 0 0 39.296 146.56l115.328 66.645333a1.706667 1.706667 0 0 0 1.621334-0.170667l48.213333-27.818666-139.264-80.426667a18.517333 18.517333 0 0 1-9.344-16.085333V370.346667l0.042667-3.968zM538.197333 425.258667l48.213334-27.861334a1.706667 1.706667 0 0 1 1.578666-0.170666l115.328 66.56a107.434667 107.434667 0 0 1-16.597333 193.792v-135.893334a18.56 18.56 0 0 0-9.301333-16.042666l-139.221334-80.384z" p-id="7329" fill="#000000"></path>
        <path d="M722.048 431.36L608 365.568a18.602667 18.602667 0 0 0-18.773333 0l-139.264 80.384V390.144a1.706667 1.706667 0 0 1 0.725333-1.408l115.285333-66.517333a107.392 107.392 0 0 1 159.445334 111.189333 167.893333 167.893333 0 0 0-3.413334-2.005333z" p-id="7330" fill="#000000"></path>
        <path d="M375.552 504.832l48.213333 27.818667 0.085334-160.853334a18.56 18.56 0 0 1 9.386666-16.128l114.090667-65.877333c1.109333-0.682667 2.218667-1.28 3.370667-1.92A107.349333 107.349333 0 0 0 374.613333 370.304V503.466667a1.706667 1.706667 0 0 0 0.938667 1.322666z" p-id="7331" fill="#000000"></path>
        <path d="M512 440.32l-62.037333 35.84v71.637333l62.037333 35.797334 61.994667-35.84V476.16L512 440.32z" p-id="7332" fill="#000000"></path>
        <path d="M512 1024c282.752 0 512-229.248 512-512S794.752 0 512 0 0 229.248 0 512s229.248 512 512 512z m245.333333-563.968a142.890667 142.890667 0 0 0-12.245333-117.205333 144.384 144.384 0 0 0-155.477333-69.290667 142.72 142.72 0 0 0-106.709334-47.957333h-1.28A144.384 144.384 0 0 0 344.32 325.504 142.762667 142.762667 0 0 0 248.874667 394.666667a144.426667 144.426667 0 0 0 17.749333 169.301333 142.805333 142.805333 0 0 0 12.245333 117.205333 144.384 144.384 0 0 0 155.434667 69.248 142.72 142.72 0 0 0 106.752 48h1.28a144.341333 144.341333 0 0 0 137.386667-100.010666 142.72 142.72 0 0 0 95.402666-69.248 144.213333 144.213333 0 0 0-17.792-169.173334z" p-id="7333" fill="#000000"></path>
        </svg>`;
      AIbox.innerHTML = `
        <div class="postAI-icon">${icon}</div>
        <div class="talk-container"><div class="postAI-talk"><span class="postAI-content"></span></div></div>
        `;
      // 将创建的元素插入到目标元素的顶部
      dom.insertBefore(AIbox, dom.firstChild);
    }

    function removeExistingAIBox() {
      const existingAIDiv = document.querySelector(".postAI-box");
      if (existingAIDiv) existingAIDiv.parentElement.removeChild(existingAIDiv);
    }

    // 点击时显示 postAI-lx
    function showSummary() {
      document
        .querySelector(".postAI-icon")
        .removeEventListener("click", showSummary);
      const summaryElement = document.querySelector(".postAI-lx");
      if (summaryElement) {
        summaryElement.style.display = "block";
        const contentBox = document.querySelector(".postAI-content");
        if (contentBox) contentBox.innerHTML = "";
      } else {
        console.warn("未找到 .postAI-lx 元素");
      }
    }

    insertAIBox();
    // 默认提示
    document.querySelector(".postAI-content").innerText =
      "点击即可生成AI摘要哦~";
    // 绑定点击事件
    document
      .querySelector(".postAI-icon")
      .addEventListener("click", showSummary);
  }

  function postFunc() {
    let dom = document.querySelector("#post #article-container");
    if (dom) {
      postAI(dom);
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    postFunc();
    document.addEventListener("pjax:complete", postFunc);
  });
})();
