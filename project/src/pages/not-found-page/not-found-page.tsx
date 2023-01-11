import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className="container">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <h1>404 Page not found</h1>
      <Link to="/">To the main page</Link>
    </div>
  );
}

export default NotFoundPage;
