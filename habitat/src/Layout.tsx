import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import deepEqual from 'deep-equal';
import { useI18n } from 'next-localization';
import {
  Placeholder,
  VisitorIdentification,
  withSitecoreContext,
  getPublicUrl,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideSitecoreContextValue } from 'lib/component-props';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  sitecoreContext: StyleguideSitecoreContextValue;
}

const Layout = ({ sitecoreContext: { route } }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      <VisitorIdentification />

      
      {/* root placeholder for the app, which we add components to using route data */}
      
  <div id="main-container">
    <header className="header-static">      
        <Placeholder name="header-top" rendering={route} />
        <Placeholder name="navbar" rendering={route} />
        </header>
        <main role="main">
        <Placeholder name="page-layout" rendering={route} />
        </main>
        <footer className="bg-dark">
        <Placeholder name="footer" rendering={route} />
        </footer>
        <Placeholder name="page-sidebar" rendering={route} />      
      </div>   
    
    </>
  );
};

const propsAreEqual = (prevProps: LayoutProps, nextProps: LayoutProps) => {
  if (deepEqual(prevProps.sitecoreContext.route, nextProps.sitecoreContext.route)) return true;

  return false;
};

export default withSitecoreContext()(React.memo(Layout, propsAreEqual));
