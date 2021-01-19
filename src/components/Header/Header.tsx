import React, { createContext, useContext, useState } from 'react';

// Styles
import {
  HeaderContainer, Title, Logo, ArrowLeft, ArrowLefContainer,
} from './style';

type ContextType = {
  title: string,
  setTitle: (newTitle: string) => string | void,
  setDoGoBack: (cb: Function | null) => null | void,
  doGoBack?: null | any
};

export const HeaderContext = createContext<ContextType>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title: '', setTitle: (newTitle: string): string | void => { }, setDoGoBack: (cb: Function | null): null | void => { },
});

interface HeaderProps {
  children: React.ReactNode
}

export const HeaderContextProvider = ({ children }: HeaderProps) => {
  const [title, setTitle] = useState('');
  const [doGoBack, setDoGoBack] = useState<null | any>(null);

  const value = React.useMemo(
    () => ({
      title,
      setTitle,
      doGoBack,
      setDoGoBack,
    }),
    [title, doGoBack],
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

const Header = () => {
  const { title, doGoBack } = useContext(HeaderContext);

  return (
    <HeaderContainer>
      {doGoBack && <ArrowLefContainer onClick={doGoBack}><ArrowLeft /></ArrowLefContainer>}
      {title ? <Title>{title}</Title> : <Logo />}
    </HeaderContainer>
  );
};

export default React.memo(Header);
