import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // watch the full location (pathname, search, hash) so any navigation scrolls to top
  const location = useLocation();

  useEffect(() => {
    // Robustly reset scroll to top on navigation. Some layouts use inner scrollable containers,
    // so we clear window, document, #root and any element with overflowY set to auto/scroll.
    const scrollAll = () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } catch (e) {
        /* ignore */
      }

      if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;

      const root = document.getElementById("root");
      if (root) root.scrollTop = 0;

      // find any scrollable elements and reset them
      const candidates = Array.from(document.querySelectorAll("*")).filter((el) => {
        if (!(el instanceof HTMLElement)) return false;
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        return (
          (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
          el.scrollHeight > el.clientHeight
        );
      });

      candidates.forEach((el) => {
        try {
          el.scrollTop = 0;
        } catch (e) {
          /* ignore */
        }
      });
    };

    // run multiple times to cover async content/layout changes
    scrollAll();
    requestAnimationFrame(scrollAll);
    const t = setTimeout(scrollAll, 60);

    return () => clearTimeout(t);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
