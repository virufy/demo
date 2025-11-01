import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Assets


// Styles
import {
  HeaderContainer, Title, ArrowLeft, CloseLeft, ArrowLefContainer, LogoSize, HeaderType, LogoDemo,
  TitleContainer, Subtitle,
} from './style';

type ContextType = {
  title: string,
  setTitle: (newTitle: string) => string | void,
  subtitle: string,
  setSubtitle: (newSubtitle: string) => string | void,
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
  subtitle: '',
  setSubtitle: noop,
  type: 'noShape',
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
  const [subtitle, setSubtitle] = useState('');
  const [type, setType] = useState<HeaderType>('noShape');
  const [logoSize, setLogoSize] = useState<LogoSize>('regular');
  const [doGoBack, setDoGoBack] = useState<null | any>(null);

  const value = React.useMemo(
    () => ({
      title,
      setTitle,
      subtitle,
      setSubtitle,
      type,
      setType,
      logoSize,
      setLogoSize,
      doGoBack,
      setDoGoBack,
    }),
    [title, subtitle, type, logoSize, doGoBack],
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

const Header = () => {
  const {
    title, subtitle, type, logoSize, doGoBack,
  } = useContext(HeaderContext);
  const location = useLocation();

  if (location.pathname === '/welcome/step-2') return null;

  return (
    <HeaderContainer backgroundType={type}>
      {(doGoBack && title && !subtitle) && <ArrowLefContainer onClick={doGoBack}><CloseLeft /></ArrowLefContainer>}
      {(doGoBack && subtitle) && <ArrowLefContainer onClick={doGoBack}><ArrowLeft /></ArrowLefContainer>}
      <TitleContainer>
        {(type !== 'noShape' && title && subtitle) && <><Title>{title}</Title> <Subtitle pb={30} colorType={type}>{subtitle}</Subtitle></>}
        {(type !== 'noShape' && title && !subtitle) && <Title pb={40}>{title}</Title>}
      </TitleContainer>
    </HeaderContainer>
  );
};

export default React.memo(Header);
