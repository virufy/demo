import React from 'react';
import { HeaderContext } from 'components/Header';

const useHeaderContext = () => {
  const {
    title, setTitle, type, setType, logoSize, setLogoSize, setDoGoBack, doGoBack,
  } = React.useContext(HeaderContext);

  return {
    title,
    setTitle,
    type,
    setType,
    logoSize,
    setLogoSize,
    doGoBack,
    setDoGoBack,
  };
};

export default useHeaderContext;
