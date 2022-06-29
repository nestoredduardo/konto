// Libraries
import { Button } from '@nextui-org/react';

// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Components
import UserDropdown from 'screens/dashboard/nav/UserDropdown';

interface IHeaderProps {
  setScreen: Dispatch<SetStateAction<keyof typeof DashboardPages>>;
}

type TPage = {
  name: string;
  page: keyof typeof DashboardPages;
};

const pages: TPage[] = [
  {
    name: 'Home',
    page: 'home',
  },
  {
    name: 'Grupos',
    page: 'groups',
  },
  {
    name: 'Wallet',
    page: 'wallet',
  },
];

const Header: React.FC<IHeaderProps> = ({ setScreen }) => {
  return (
    <>
      <header className="flex p-6 items-center lg:mx-12 xl:mx-24">
        <button onClick={() => setScreen('home')} className="flex items-center">
          <img src="/logo.svg" width="58" height="61.5" />
          <p className="font-bold text-4xl text-primary ml-4">Konto</p>
        </button>
        <div className="hidden md:inline-flex">
          {pages.map((page) => {
            return (
              <Button light onClick={() => setScreen(page.page)}>
                {page.name}
              </Button>
            );
          })}
        </div>

        <div className="ml-auto">
          <UserDropdown setScreen={setScreen} />
        </div>
      </header>
      <div className="fixed backdrop-blur-sm z-10 pb-6 w-full flex justify-center bottom-0 md:hidden">
        <Button.Group size="xl">
          {pages.map((page) => {
            return (
              <Button onPress={() => setScreen(page.page)}>{page.name}</Button>
            );
          })}
        </Button.Group>
      </div>
    </>
  );
};

export default Header;
