import { useLayoutEffect, useRef } from 'react';

export default function useOrderTableScroll() {
  const headerScrollRef = useRef(null);
  const bodyScrollRef = useRef(null);

  useLayoutEffect(() => {
    const body = bodyScrollRef.current;
    const header = headerScrollRef.current;
    if (!body || !header) return undefined;

    const syncHeaderWidth = () => {
      header.style.width = `${body.clientWidth}px`;
    };

    const resizeObserver = new ResizeObserver(syncHeaderWidth);
    resizeObserver.observe(body);
    resizeObserver.observe(header.parentElement);
    syncHeaderWidth();

    return () => resizeObserver.disconnect();
  }, []);

  function handleScroll(event) {
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollLeft = event.currentTarget.scrollLeft;
    }
  }

  return { headerScrollRef, bodyScrollRef, handleScroll };
}
