import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Styles
import {
  HeaderContainer, Title, Logo, ArrowLeft, ArrowLefContainer, LogoSize, HeaderType,
} from './style';

type ContextType = {
  title: string,
  setTitle: (newTitle: string) => string | void,
  logoSize: LogoSize;
  setLogoSize: (newLogo: LogoSize) => string | void,
  type: HeaderType,
  setType: (newType: HeaderType) => string | void,
  setDoGoBack: (cb: Function | null) => null | void,
  doGoBack?: null | any
};

const noop = () => {};
export const HeaderContext = createContext<ContextType>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title: '',
  setTitle: noop,
  type: 'secondary',
  setType: noop,
  setDoGoBack: noop,
  logoSize: 'regular',
  setLogoSize: noop,
});

interface HeaderProps {
  children: React.ReactNode
}

export const HeaderContextProvider = ({ children }: HeaderProps) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<HeaderType>('secondary');
  const [logoSize, setLogoSize] = useState<LogoSize>('regular');
  const [doGoBack, setDoGoBack] = useState<null | any>(null);

  const value = React.useMemo(
    () => ({
      title,
      setTitle,
      type,
      setType,
      logoSize,
      setLogoSize,
      doGoBack,
      setDoGoBack,
    }),
    [title, type, logoSize, doGoBack],
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

const Header = () => {
  const {
    title, type, logoSize, doGoBack,
  } = useContext(HeaderContext);
  const location = useLocation();

  if (location.pathname === '/welcome/step-2') return null;

  return (
    <HeaderContainer backgroundType={type}>
      {doGoBack && <ArrowLefContainer onClick={doGoBack}><ArrowLeft /></ArrowLefContainer>}
      {title ? (
        <Title>{title}</Title>
      ) : (
        <Logo size={logoSize} />
      )}
    </HeaderContainer>
  );
};

export default React.memo(Header);
