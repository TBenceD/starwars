import { useEffect, useState } from "react";

type useIsScrollableProps = {
  dependencies: any[];
};

export function useIsScrollable(props: useIsScrollableProps): boolean {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollableNow =
        document.documentElement.scrollHeight > window.innerHeight;
      setIsScrollable(isScrollableNow);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [...props.dependencies]);

  return isScrollable;
}
