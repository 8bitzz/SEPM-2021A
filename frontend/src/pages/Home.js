import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = (props) => {
  const history = useHistory();

  return (
    <>
      <h1>Home Page</h1>
      <p>Go to the contact page by using one of the following:</p>
      <hr />

      {/* Button */}
      <p>
        <button onClick={() => history.push('/contact')}>Go to Contact</button>
      </p>

      {/* Checkbox */}
      <p>
        <input
          type="checkbox"
          onChange={() => history.push('/contact')}
        ></input>
        <span>Check this checkbox to go to the contact page</span>
      </p>

      {/* Text field */}
      <p>
        <input
          type="text"
          onChange={(e) => {
            if (e.target.value === 'contact') {
              history.push('/contact');
            }
          }}
          placeholder="Enter 'contact' to navigate"
        ></input>
      </p>
    </>
  );
};

export default Home;