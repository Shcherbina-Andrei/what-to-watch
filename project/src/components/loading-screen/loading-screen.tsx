import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page-loading">
      <div id="loaderSvgWrapper">
        <svg width="200" height="200" viewBox="0 0 200 200" id="preloader">
          <circle cx="100" cy="100" r="3" id="red"/>
          <circle cx="100" cy="100" r="8" id="orange"/>
          <circle cx="100" cy="100" r="13" id="yellow"/>
          <circle cx="100" cy="100" r="18" id="green"/>
        </svg>
      </div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default LoadingScreen;
