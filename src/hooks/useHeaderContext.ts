import React from 'react';
import { HeaderContext } from 'components/Header';

const useHeaderContext = () => {
  const {
    title, setTitle, setDoGoBack, doGoBack,
  } = React.useContext(HeaderContext);

  return {
    title,
    setTitle,
    doGoBack,
    setDoGoBack,
  };
};

export default useHeaderContext;
