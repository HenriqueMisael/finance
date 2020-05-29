import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { Helmet } from 'react-helmet';

function AppTitle({ screen }) {
  return (
    <Helmet>
      <title>{`${i18next.t('app.title')} | ${i18next.t(`${screen}.title`)}`}</title>
    </Helmet>
  );
}

AppTitle.propTypes = {
  screen: PropTypes.string.isRequired,
};
export default AppTitle;
