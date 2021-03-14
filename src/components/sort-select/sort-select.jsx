import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {SortOrders} from '../../constants';

const SortSelect = ({order, onSetOrder}) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleSetOrder = () => {
    const newOrder = document.activeElement.dataset.order;
    if (newOrder === order) {
      setIsOpen(false);
      return;
    }
    onSetOrder(newOrder);
  };

  const handleKeyDown = (evt) => {
    if (evt.code === `Escape`) {
      setIsOpen(false);
      document.activeElement.blur();
    } else if (evt.code === `Enter` && document.activeElement.dataset.order) {
      handleSetOrder();
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    document.addEventListener(`keydown`, handleKeyDown);
  };

  const handleBlur = (evt) => {
    document.removeEventListener(`keydown`, handleKeyDown);
    const next = evt && evt.relatedTarget;
    if (!next || !next.dataset.order) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    return () => {
      document.removeEventListener(`keydown`, handleKeyDown);
      setIsOpen(false);
    };
  }, [order, onSetOrder]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onFocus={handleFocus} onBlur={handleBlur}
        className="places__sorting-type" tabIndex={0}>&nbsp;
        {`${order}`}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpen ? ` places__options--opened` : ``}`}>
        {Object.keys(SortOrders).map((key) => (
          <li data-order={SortOrders[key]}
            onClick={handleSetOrder} onFocus={handleFocus} onBlur={handleBlur}
            className={`places__option${SortOrders[key] === order ? ` places__option--active` : ``}`}
            tabIndex={0}
            key={SortOrders[key]}
          >{SortOrders[key]}
          </li>
        ))}
      </ul>
    </form>
  );
};

SortSelect.propTypes = {
  order: PropTypes.oneOf(Object.values(SortOrders)),
  onSetOrder: PropTypes.func
};

export default React.memo(SortSelect);
