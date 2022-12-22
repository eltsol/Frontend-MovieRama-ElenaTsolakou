import { useEffect, useState } from "react";

const useInfiniteScroll = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
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
    document.addEventListener("DOMContentLoaded", handleScroll);
    return () => document.removeEventListener("DOMContentLoaded", handleScroll);
  }, []);

  return { isAtBottom };
};

export default useInfiniteScroll;
