import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash/fp';

const useScrollAware = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef();

  const onScroll = useCallback(
    throttle(18, e => setScrollTop(e.target.scrollTop)),
    []
  );

  useEffect(() => {
    const scrollContainer = ref.current;

    setScrollTop(scrollContainer.scrollTop);
    scrollContainer.addEventListener('scroll', onScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return [scrollTop, ref];
};

const VirtualScroll = props => {
  const {
    rowRenderer,
    rowCount,
    height,
    width,
    rowHeight,
    scrollToIndex,
    className,
    overScan = 4
  } = props;
  const [scrollTop, ref] = useScrollAware();
  const totalHeight = rowCount * rowHeight;

  const startNode = Math.max(0, Math.floor(scrollTop / rowHeight) - overScan);
  const visibleNodeCount = Math.min(
    rowCount - startNode,
    Math.ceil(height / rowHeight) + 2 * overScan
  );

  const visibleChildren = useMemo(
    () =>
      new Array(visibleNodeCount).fill(null).map((_, index) =>
        rowRenderer({
          index: index + startNode,
          style: { position: 'absolute', top: (index + startNode) * rowHeight }
        })
      ),
    [rowHeight, rowRenderer, startNode, visibleNodeCount]
  );

  useEffect(() => {
    if (typeof scrollToIndex === 'number') {
      ref.current.scrollTop = scrollToIndex * rowHeight;
    }
  }, [ref, rowHeight, scrollToIndex]);

  return (
    <div
      style={{ height, width, overflowY: 'auto' }}
      ref={ref}
      className={className}
    >
      <div
        style={{
          overflow: 'hidden',
          height: totalHeight,
          zIndex: 1,
          position: 'relative'
        }}
      >
        {visibleChildren}
      </div>
    </div>
  );
};

VirtualScroll.propTypes = {
  rowRenderer: PropTypes.func,
  rowCount: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  rowHeight: PropTypes.number,
  scrollToIndex: PropTypes.number,
  className: PropTypes.string,
  overScan: PropTypes.number
};

export default memo(VirtualScroll);
