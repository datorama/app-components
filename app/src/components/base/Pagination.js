import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import styled, { css } from 'styled-components';
import { range } from 'lodash/fp';
import PropTypes from 'prop-types';
import { hexToRgba } from '../utils';

// icons
import ArrowDown from '../icons/ArrowDown.icon';
import DoubleArrowDown from '../icons/DoubleArrowDown.icon';

const Pagination = props => {
  const [current, setCurrent] = useState(1);
  const [selected, setSelected] = useState(1);
  const { total, max, className, onChange } = props;
  const noControls = total <= max;

  const update = useCallback(() => {
    onChange(selected);
  }, [onChange, selected]);

  const next = useCallback(() => {
    const next = current + 1;
    const nextSelected = selected + 1;

    if (nextSelected > total) {
      return;
    }

    setSelected(nextSelected);
    setCurrent(nextSelected > max && next < total - max + 2 ? next : current);
  }, [current, max, selected, total]);

  const prev = useCallback(() => {
    const next = current - 1;
    const nextSelected = selected - 1;

    if (nextSelected <= 0) {
      return;
    }

    let updateCurrent = nextSelected >= max;
    if (nextSelected > max) {
      updateCurrent = total - selected > max - 2;
    }

    setSelected(nextSelected);
    setCurrent(updateCurrent ? next : current);
  }, [current, max, selected, total]);

  const setPage = useCallback(
    selected => () => {
      // update current
      let next = current;
      if (selected === 1) {
        next = 1;
      }

      if (selected === total && total > max) {
        next = total - max + 1;
      }

      setSelected(selected);
      setCurrent(next);
    },
    [current, max, total]
  );

  const getPages = useMemo(() => {
    let pageRange = range(current, current + max);

    // show all
    if (total <= max) {
      pageRange = range(1, total + 1);
    }

    return pageRange.map(page => (
      <Button
        key={`page-${page}`}
        onClick={setPage(page)}
        selected={page === selected}
      >
        {page}
      </Button>
    ));
  }, [current, max, selected, setPage, total]);

  useEffect(() => {
    update();
  }, [current, selected, update]);

  return (
    <Container className={className}>
      {!noControls && (
        <Fragment>
          <Button filled onClick={setPage(1)}>
            <DoubleArrow rotate={90} />
          </Button>
          <Button filled onClick={prev}>
            <Arrow rotate={90} />
          </Button>
        </Fragment>
      )}

      {getPages}

      {!noControls && (
        <Fragment>
          <Button filled onClick={next}>
            <Arrow rotate={-90} />
          </Button>
          <Button filled onClick={setPage(total)}>
            <DoubleArrow rotate={-90} />
          </Button>
        </Fragment>
      )}

      <Divider />

      <Info>
        {selected} out of {total}
      </Info>
    </Container>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Pagination;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  width: 24px;
  height: 24px;
  background: ${({ theme, filled }) =>
    filled ? hexToRgba(theme.p300, 15) : 'transparent'};
  cursor: pointer;
  margin: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  transition: ${({ filled }) => (filled ? 'all 300ms' : 'none')};

  ${({ theme }) => theme.text.smLink};
  color: ${({ theme }) => theme.p300};

  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.p600};
    `};

  &:hover {
    color: ${({ theme }) => theme.p400};
  }

  ${({ filled, theme }) =>
    filled &&
    css`
      &:hover {
        background: ${hexToRgba(theme.p300, 30)};
      }
    `};
`;

const Divider = styled.div`
  width: 1px;
  height: 18px;
  margin: 0 8px;
  background: ${({ theme }) => theme.p200};
`;

const Info = styled.div`
  ${({ theme }) => theme.text.smNote};
  width: 90px;
`;

const Arrow = styled(ArrowDown)`
  width: 10px;
  height: 10px;
  transform: rotate(${({ rotate }) => `${rotate}deg`});
  * {
    fill: ${({ theme }) => theme.p400};
  }
`;

const DoubleArrow = styled(DoubleArrowDown)`
  width: 14px;
  height: 14px;
  transform: rotate(${({ rotate }) => `${rotate}deg`});
  * {
    fill: ${({ theme }) => theme.p400};
  }
`;
