"use client";

import { Provider as ReduxProvider } from "react-redux";
import store from "@/utils/store/store";
import { CMSContext } from "./CMSContext";

export default function Providers({ children, cms }) {
  return (
    <ReduxProvider store={store}>
      {/* CMS now available instantly to the whole app */}
      <CMSContext.Provider value={cms}>
        {children}
      </CMSContext.Provider>
    </ReduxProvider>
  );
}
