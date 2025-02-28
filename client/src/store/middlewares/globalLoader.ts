import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { showGlobalLoader, hideGlobalLoader } from "../reducers/globalLoader";

interface CustomAction extends PayloadAction {
  meta: {
    showLoader: boolean;
  };
  type: string;
}

// Define the middleware with proper types
export const loadingMiddleware: Middleware<RootState> =
  (store) => (next) => (action: unknown): unknown => {
    // Check if the action has the `showLoader` meta property
    const { meta, type } = action as CustomAction;
    if (meta?.showLoader) {
      if (type.endsWith("/pending")) {
        store.dispatch(showGlobalLoader());
      }
      if (type.endsWith("/fulfilled") || type.endsWith("/rejected")) {
        store.dispatch(hideGlobalLoader());
      }
    }

    return next(action); // Proceed with the action
  };
