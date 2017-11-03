import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import DefaultLayout from '../../layouts/default/index.jsx';
import LogoutBtn from '../../components/logout-btn.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = ({ history, client, refetch, curUser }) => (
  <DefaultLayout>
    {curUser
      ? (
        <div>
          <LogoutBtn
            onLogoutHook={() => {
              client.resetStore();
              history.push('/auth');
            }}
          />
          <pre>{JSON.stringify(curUser, null, 2)}</pre>
          <button onClick={() => refetch()}>Refetch the query!</button>
        </div>
      )
      : 'Please log in!'
    }
  </DefaultLayout>
);

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
  curUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    randomString: PropTypes.string.isRequired,
  }).isRequired,
};

const enhance = compose(
  withRouter,
  withApollo,
);

export default enhance(HomePage);