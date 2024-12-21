'use client';

import { NextUIProvider } from '@nextui-org/react';
import PropTypes from 'prop-types';

function Providers({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
