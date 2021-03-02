import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {SortOrders} from '../../constants';

const SortSelect = ({order, onSetOrder}) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenToggle = () => {
    setIsOpen(
        (prevState) => (!prevState)
    );
  };

  const handleSetOrder = (orderData) => {
    onSetOrder(orderData);
    handleOpenToggle();
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handleOpenToggle}
        className="places__sorting-type" tabIndex={0}>&nbsp;
        {`${order}`}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpen ? ` places__options--opened` : ``}`}>
        {Object.keys(SortOrders).map((key) => (
          <li onClick={() =>(handleSetOrder(SortOrders[key]))}
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
