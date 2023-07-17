import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className='flex justify-center'>
    <div className='tc code'>
      <h1 className='mt6 f1'>404 - Page Not Found</h1>
      <p className='f4'>The page you are looking for does not exist.</p>
      <p className="f5 link dim tc blue db mt5"><Link className='no-underline' to={'/'}>Go to Home page</Link></p>
      </div>
    </div>
  );
};

export default Error404;