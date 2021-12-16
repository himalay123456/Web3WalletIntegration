/* eslint-disable object-curly-newline */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/HeaderHome1';

function PageNotFound() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Header />
      <div style={{ height: '90vh', padding: '20px 15px 0', fontSize: '1.8rem', flexDirection: 'column', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Oops No Page Found !!
        <Link to="/"><p style={{ fontSize: '1.5rem' }}> Navigate to Home</p></Link>
      </div>

    </>
  );
}

export default PageNotFound;
