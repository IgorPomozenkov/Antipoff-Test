import React, { useEffect } from 'react';
import './style.css';

const NotFound: React.FC = () => {
  //
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const headEl = document.head.children as any;
    document.title = 'Page not found';
    headEl.description.content =
      'Sorry, the page you requested was not found. Please go to the existing section';

    const metaRobots = document.createElement('meta');
    metaRobots.name = 'Robots';
    metaRobots.content = 'noindex, follow';

    const metaRef = document.createElement('meta');
    metaRef.httpEquiv = 'refresh';
    metaRef.content = '0';

    document.head.appendChild(metaRobots);
    //document.head.appendChild(metaRef);
  }, []);

  return (
    <div className="notFound container">
      <div className="imageWrap">
        <img className="image mainImg" src="" alt="404 - Page not found" />
      </div>
    </div>
  );
};

export default NotFound;
