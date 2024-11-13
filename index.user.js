// ==UserScript==
// @name         Auto-fill Verification Field
// @namespace    https://github.com/DeepChirp/Auto-fill-Verification-Field
// @version      2024-11-13
// @description  Automatically fills the verification field
// @author       DeepChirp
// @match        *://github.com/*/*/settings
// @grant        MIT
// ==/UserScript==

(async function() {
    'use strict';

    async function loadConfig() {
        const localConfig = {
            "github.com": {
                "paths": [/\/.*\/.*\/settings/],
                "fields": [
                    {
                        "selector": "#verification_field",
                        "value": () => {
                            const el = document.querySelector("#verification_field");
                            return el?.dataset.repoNwo || '';
                        }
                    }
                ]
            },
        };

        return localConfig;
    }

    const config = await loadConfig();
    const host = window.location.hostname;
    const path = window.location.pathname;

    if (config[host]) {
        const siteConfig = config[host];

        const isPathMatch = siteConfig.paths ? siteConfig.paths.some(regex => regex.test(path)) : true;

        if (isPathMatch) {
            let isFilled = false;

            const observer = new MutationObserver((mutations, obs) => {
                siteConfig.fields?.forEach(field => {
                    const fieldElement = document.querySelector(field.selector);

                    if (fieldElement && !isFilled) {
                        const value = typeof field.value === 'function' ? field.value() : field.value;
                        console.log('input', value, 'in', field.selector);

                        // 使用模拟输入，更能够触发相关的事件
                        fieldElement.focus();
                        fieldElement.value = '';

                        for (let i = 0; i < value.length; i++) {
                            const char = value[i];

                            fieldElement.value += char;

                            const keyDownEvent = new KeyboardEvent('keydown', { key: char, bubbles: true });
                            const keyPressEvent = new KeyboardEvent('keypress', { key: char, bubbles: true });
                            const inputEvent = new Event('input', { bubbles: true });
                            const keyUpEvent = new KeyboardEvent('keyup', { key: char, bubbles: true });

                            fieldElement.dispatchEvent(keyDownEvent);
                            fieldElement.dispatchEvent(keyPressEvent);
                            fieldElement.dispatchEvent(inputEvent);
                            fieldElement.dispatchEvent(keyUpEvent);
                        }

                        fieldElement.dispatchEvent(new Event('change', { bubbles: true }));
                        isFilled = true;

                        obs.disconnect();
                    }
                });
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }
    };
})();