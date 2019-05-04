import browser from "webextension-polyfill";
import hyper from "hyperhtml";

export const loadTabs = state => async () => {
  state.tabs = await browser.tabs.query({ currentWindow: true });
};

export const clearTabs = state => () => {
  state.tabs = [];
};

export const renderTab = tab =>
  hyper.wire(tab)`<li>${tab.title}: ${tab.url}</li>`;
