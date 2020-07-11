import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Root, Table, TBody, THead } from './styled-wrappers';

function TransactionMethodList({ slotButtonAdd, children }) {
  return (
    <Root>
      <Table>
        <THead>
          {i18next.t('transactionMethodList.title')}
          {slotButtonAdd}
        </THead>
        <TBody>{children}</TBody>
      </Table>
    </Root>
  );
}

TransactionMethodList.propTypes = {
  slotButtonAdd: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default TransactionMethodList;
