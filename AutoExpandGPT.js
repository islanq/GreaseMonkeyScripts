// ==UserScript==
// @name         islanq
// @version      0.2
// @description  Expand an element on a web page using Greasemonkey.
// @author       Auto Expand Collapsed Elements
// @match        https://chat.openai.com/c/*   // Replace with the URL of the website where you want to apply the script
// @match        https://chat.openai.com/c/*/*   // Replace with the URL of the website where you want to apply the script
// @include http://chat.openai*/*
// @include https://*/*
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant GM_info
// @grant GM_getMetadata
// @run-at document-start
// @connect *
// ==/UserScript==

(function() {
    'use strict';

    console.log("Script is running");

    function clickShowWorkElement(element) {
        const buttonText = element.querySelector('div.text-xs.text-gray-600')?.textContent;

        if (buttonText && (buttonText.includes('Show work') || buttonText.includes('Finished working'))) {
            element.click();
            return true;
        }
        return false;
    }

    function isInViewport(element) {
        const bounding = element.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        const elements = document.querySelectorAll('div[role="button"]');
        for (const element of elements) {
            if (isInViewport(element)) {
                console.log("Element is in the viewport");
                const clicked = clickShowWorkElement(element);
                if (clicked) return;
            }
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    // Listen for click events
    document.addEventListener('click', handleScroll);

    // Repeated checks every second
    setInterval(handleScroll, 1000);
    // Watch for changes in the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                handleScroll();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log("Event listeners and observers attached");
})();

