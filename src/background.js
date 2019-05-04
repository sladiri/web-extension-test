import browser from "webextension-polyfill";

browser.browserAction.onClicked.addListener(event => {
  browser.tabs.create({
    url: browser.runtime.getURL("app.html"),
  });
});
