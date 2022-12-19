import { useEffect, useState } from "react";

const useHasScrolledToBottom = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollHandler = () => {
    document.addEventListener("DOMContentLoaded", function (e) {
      document.addEventListener("scroll", function (e) {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let modifier = 200;
        if (currentScroll + modifier > documentHeight) {
          setIsAtBottom(true);
        }
      });
    });
  };

  useEffect(() => {}, []);

  return { isAtBottom };
};

export { useHasScrolledToBottom };
