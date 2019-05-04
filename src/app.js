import browser from "webextension-polyfill";
import hyper from "hyperhtml";

import {
  initPermissions,
  changePermission,
  renderPermission,
} from "./permissions";
import { loadTabs, clearTabs, renderTab } from "./tabs";

const state = {
  tabs: [],
  permissionResponse: "",
  permissions: null,
};

initPermissions(state);

const render = html => {
  html`
    <h1>Hello Firefox extensions!</h1>
    <section>
      <h2>Permissions</h2>
      <section>
        <p>Result: ${state.permissionResponse}</p>
        <h3>History</h3>
        <p>
          The <code>tabs</code> permission has been <b>granted</b> on install.
        </p>
        <p>
          The <code>history</code> permission is an optional permission that can
          be
          <button onclick=${changePermission(state, "history", true)}>
            granted
          </button>
          or
          <button onclick=${changePermission(state, "history")}>
            revoked
          </button>
        </p>
      </section>

      <section>
        <h3>Cookies</h3>
        <p>
          The <code>cookies</code> permission cannot be
          <button onclick=${changePermission(state, "cookies", true)}>
            granted</button
          >, because it was not included in the
          <code>optional_permissions</code> manifest key.
        </p>
      </section>

      <section>
        <h3>Foo</h3>
        <p>
          The <code>foo</code> permission cannot be
          <button onclick=${changePermission(state, "foo", true)}>
            granted</button
          >, because it is not a valid permission name.
        </p>
      </section>

      <section>
        <h3>Active Permissions</h3>
        <p><b>Current permissions returned by the API:</b></p>
        ${state.permissions
          ? hyper.wire()`<ul>${state.permissions.map(renderPermission)}</ul>`
          : "loading ..."}
      </section>
    </section>

    <section>
      <h2>Tabs</h2>
      <button onclick=${loadTabs(state)}>Show me tabs</button>
      <button onclick=${clearTabs(state)}>Clear my tabs</button>
      <ul>
        ${state.tabs.map(renderTab)}
      </ul>
    </section>
  `;
};

setInterval(render, 300, hyper.bind(document.body));
render(hyper.bind(document.body));
