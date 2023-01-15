import type { NextPage } from 'next';

import Home from '@/modules/home';
import { getUserLocalStorage } from '@/common/lib/localStorage';
import Login from '@/modules/home/components/login';
import { useEffect, useState } from 'react';

const HomePage: NextPage = () => {

  const [user, setUser] = useState({});

  useEffect(
    () => {
      const u = getUserLocalStorage();
      console.log(u);
      setUser(u);
    },
    []
  )

  if (!user) {
    return <Login/>;
  }
  return <Home />;
};

export default HomePage;
