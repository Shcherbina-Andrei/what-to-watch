import React from 'react';
import { Helmet } from 'react-helmet-async';
import PromoHeader from '../../components/promo-header/promo-header';
import Footer from '../../components/footer/footer';
import FilmsCatalog from '../../components/films-catalog/films-catalog';

function MainPage(): JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>What to watch</title>
      </Helmet>
      <PromoHeader />
      <div className="page-content">
        <FilmsCatalog />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;
