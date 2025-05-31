'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only executed on client-side and server-side, but not during build time.
  // Alternatively, we can use a state variable to memoize the sheet creation.
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // styledComponentsStyleSheet.instance.clearTag() // Deprecated
    // The ServerStyleSheet is created fresh for each server request due to useState,
    // and useServerInsertedHTML extracts its styles once for that request.
    // Explicit clearing might not be necessary with this setup or could require
    // a different approach if style accumulation is observed.
    // For now, removing the problematic .gs.clear() call.
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    // On the client side, just render children directly.
    // The styles are already injected server-side or managed by the client-side runtime.
    return <>{children}</>;
  }

  // On the server side, wrap children with StyleSheetManager to collect styles.
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  );
}
