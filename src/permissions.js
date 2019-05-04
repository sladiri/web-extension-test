import browser from "webextension-polyfill";
import hyper from "hyperhtml";

export const initPermissions = async state => {
  try {
    const response = await browser.permissions.getAll();
    state.permissions = response.permissions;
  } catch (err) {
    console.error("initPermissions", err);
  }
};

export const changePermission = (state, permission, grant) => {
  const options = { permissions: [permission] };
  return async () => {
    state.permissionResponse = "changing permissions ...";
    try {
      if (grant) {
        browser.permissions
          .request(options)
          .then(() => {
            // never called
            console.log("browser.permissions.request then");
          })
          .catch(err => {
            // only called if "was not declared in optional_permissions"
            state.permissionResponse = `Error: ${err.message}`;
          })
          .finally(() => {
            // only called if "was not declared in optional_permissions"
            console.log("browser.permissions.request finally");
          });
      } else {
        await browser.permissions.remove(options);
      }
      state.permissionResponse = "Call successful.";
    } catch (err) {
      // Catch the case where the permission is completely wrong.
      state.permissionResponse = `Error: ${err.message}`;
    }
    state.permissions = (await browser.permissions.getAll()).permissions;
  };
};

export const renderPermission = permission =>
  hyper.wire()`<li>${permission}</li>`;
