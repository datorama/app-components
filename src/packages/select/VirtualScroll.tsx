import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  UIEvent,
  MutableRefObject,
} from "react";
import { throttle, isNumber } from "lodash/fp";

const useScrollAware = (): [
  number,
  MutableRefObject<HTMLDivElement | null>
] => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(
    throttle(18, (event: UIEvent<HTMLDivElement>) =>
      setScrollTop(event.currentTarget.scrollTop)
    ),
    []
  );

  useEffect(() => {
    if (!ref.current) return;

    const scrollContainer = ref.current;

    setScrollTop(scrollContainer.scrollTop);
    // @ts-ignore
    scrollContainer.addEventListener("scroll", onScroll);

    return () => {
      // @ts-ignore
      scrollContainer.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return [scrollTop, ref];
};

interface VirtualScrollProps {
  rowRenderer: ({
    index,
    style,
  }: {
    index: number;
    style: Record<string, string | number>;
  }) => ReactNode;
  rowCount: number;
  height: number;
  width?: number;
  rowHeight: number;
  scrollToIndex: number;
  className?: string;
  overScan?: number;
}

const VirtualScroll = (props: VirtualScrollProps) => {
  const {
    rowRenderer,
    rowCount,
    height,
    width,
    rowHeight,
    scrollToIndex,
    className,
    overScan = 4,
  } = props;
  const [scrollTop, ref] = useScrollAware();
  const totalHeight = rowCount * rowHeight;

  const startNode = Math.max(0, Math.floor(scrollTop / rowHeight) - overScan);
  let visibleNodeCount = Math.min(
    rowCount - startNode,
    Math.ceil(height / rowHeight) + 2 * overScan
  );
  visibleNodeCount = Math.max(0, visibleNodeCount);

  const visibleChildren = useMemo(
    () =>
      new Array(visibleNodeCount).fill(null).map((_, index) =>
        rowRenderer({
          index: index + startNode,
          style: { position: "absolute", top: (index + startNode) * rowHeight },
        })
      ),
    [rowHeight, rowRenderer, startNode, visibleNodeCount]
  );

  useEffect(() => {
    if (isNumber(scrollToIndex) && ref.current) {
      ref.current.scrollTop = scrollToIndex * rowHeight;
    }
  }, [ref, rowHeight, scrollToIndex]);

  return (
    <div
      style={{ height, width, overflowY: "auto" }}
      ref={ref}
      className={className}
    >
      <div
        style={{
          overflow: "hidden",
          height: totalHeight,
          zIndex: 1,
          position: "relative",
        }}
      >
        {visibleChildren}
      </div>
    </div>
  );
};

export default memo(VirtualScroll);
