import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../header/header';

const PageNotFound = () => (
  <div className="page" style={{height: `90vh`, textAlign: `center`}}>
    <Header/>
    <h1>404.
      <br />
      <small>Page not found</small>
    </h1>
    <Link style={{textDecoration: `underline`}} to="/">Go to main page</Link>
  </div>
);


export default PageNotFound;
