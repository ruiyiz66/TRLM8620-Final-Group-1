import { locale, updateLocale } from '../app.js';

var stringsJSON = {};

const i18n = {

    // Load resource JSON based on locale
    loadStringsJSON: async (newLocale) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`./content/${newLocale}/strings.json`, options);
            stringsJSON = await response.json();
        } catch (err) {
            console.log('Error getting strings', err);
            if (newLocale != "en-US") {
                updateLocale("en-US");
            }
        }
    },

    // Get translated string
    getString: (view, key) => {
        return stringsJSON[view][key];
    },

    // Currency formatting with conversion + local symbol
    formatCurrency: (price, color) => {
        // 1) 先按 locale 做汇率转换
        const converted = convertCurrency(price);

        // 2) 根据 locale 选币种（符号）
        const currencyCode = currencyMap[locale] || 'USD';

        // 3) 用 Intl.NumberFormat 做本地格式化
        const formatted = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode
        }).format(converted); //$NON-NLS-L$

        // color 参数没用到，但保留函数签名，避免别处报错
        return `<h4>${formatted}</h4>`;
    },

    // return the locale based link to html file within the 'static' folder
    getHTML: () => {
        return `${locale}/terms.html`; //$NON-NLS-L$ 
    },

    // format date according to locale
    formatDate: (date) => {
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat([locale, 'en-US'], options).format(date); //$NON-NLS-L$
    }
};

// locale -> currency code (for symbol)
var currencyMap = {
    'en-US': 'USD',
    'zh-CN': 'CNY',
    'nl-NL': 'EUR'
};

// locale -> 汇率（示例：假设 base price 是 “USD 价格/credits”）
var rateMap = {
    'en-US': 1,      // base: USD
    'zh-CN': 7.2,    // 1 USD ≈ 7.2 CNY（示例，可调整）
    'nl-NL': 0.92    // 1 USD ≈ 0.92 EUR（示例，可调整）
};

// 传入的是 base price（以 USD 或 credits 为单位），输出转换后的当地货币数值
var convertCurrency = (price) => {
    const rate = rateMap[locale] || 1;
    return price * rate;
};

export default i18n;
