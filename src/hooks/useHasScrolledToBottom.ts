import { useEffect, useState } from "react";

const useHasScrolledToBottom = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollHandler = () => {
    document.addEventListener("scroll", () => {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      let modifier = 200;
      if (currentScroll + modifier > documentHeight) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    });
  };

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", scrollHandler);
    return () => document.removeEventListener("DOMContentLoaded", scrollHandler);
  }, []);

  return { isAtBottom };
};

export { useHasScrolledToBottom };
