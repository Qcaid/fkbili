// ==UserScript==
// @name       Fuckbilibili
// @namespace   https://github.com/Mst7we1/fkbili
// @version      0.2.3
// @description  移除b站下载提示框及特定广告
// @author       Msdwei
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

  console.log("%cfuckbilibili已正常载入", "color: blue");
  console.log("%cb站可能会倒闭，但不会变质", "color:red");
  console.log("%ccode by Qcai", "color:pink");

  const selectors = [".desktop-download-tip", ".adcar-inner"];

  // 移除提示框
  const removeElements = () => {
    selectors.forEach((selector) => {
      const nodes = document.querySelectorAll(selector);
      nodes.forEach((node) => {
        if (node && node.parentNode) {
          console.log(`移除${selector}`);
          node.parentNode.removeChild(node);
        }
      });
    });
  };

  const setupObserver = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          removeElements();
        });
      });
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.documentElement, config);

    window.addEventListener("beforeunload", () => {
      console.log("断开观察者");
      observer.disconnect();
    });
  };

  window.addEventListener("load", () => {
    removeElements();
    setupObserver();
  });
})();
