import * as React from 'react';

import './index.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';

export interface OwnProps {
}

export interface Props extends OwnProps {
  children?: JSX.Element
}

export default function MainLayout({children}: Props): JSX.Element {
  return (
      <div>
        <Header />
        <section>
          {children}
        </section>
        <Footer />
      </div>
  );
}