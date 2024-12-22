import PropTypes from 'prop-types';
import '../styles/globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};
