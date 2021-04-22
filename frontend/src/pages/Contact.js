import React from 'react';
import { useHistory } from 'react-router-dom';

const Contact = (props) => {
  const history = useHistory();
  return (
    <>
      <h1>Contact Page</h1>
      <br />
      <button onClick={() => history.goBack()}>Go Back</button>
    </>
  );
};

export default Contact;