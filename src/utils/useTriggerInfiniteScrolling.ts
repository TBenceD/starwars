import { useEffect } from "react";

type useIsScrollableProps = {
  triggeringFunction: () => void;
  dependencies: any[];
  loadedAll: boolean;
  isLoaded: boolean;
};

export function useTriggerInfiniteScrolling(props: useIsScrollableProps) {
  const { triggeringFunction, dependencies, loadedAll, isLoaded } = props;

  useEffect(() => {
    const handleScroll = async () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const indicatorBottom = scrollTop + clientHeight;
      // Calculate 2% from the bottom of the scrollbar
      const twoPercentFromBottom = scrollHeight * 0.98;

      // Check if the indicator bottom is approximately 2% from the bottom
      const isTwoPercentFromBottom = indicatorBottom >= twoPercentFromBottom;

      if (!loadedAll && isTwoPercentFromBottom && isLoaded) {
        triggeringFunction();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [...dependencies]);
}
