import type { NextPage } from 'next';

import Home from '@/modules/home';
import { getUserLocalStorage } from '@/common/lib/localStorage';
import Login from '@/modules/home/components/login';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {

  const router = useRouter();

  const [user, setUser] = useState({});

  useEffect(
    () => {
      const u = getUserLocalStorage();
      setUser(u);
    },
    []
  );

  if (!user) {
    router.push('/login');
    return <div></div>;
  }
  return <Home />;
};

export default HomePage;
