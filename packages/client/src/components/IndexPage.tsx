import { CvPreview } from './cv-preview';
import React from 'react';

export const IndexPage = () => {
  // get the user using a graphql request
  // if no user exists, show the login page.
  // otherwise, show a <HomePage />
  // HomePage should be a dummy component for now
  return <CvPreview />;
};
