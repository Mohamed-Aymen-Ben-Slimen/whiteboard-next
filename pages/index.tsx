import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Home from "@/modules/home";
import { getUserLocalStorage } from "@/common/lib/localStorage";

const HomePage: NextPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({});

  useEffect(() => {
    const u = getUserLocalStorage();
    setUser(u);
  }, []);

  if (!user) {
    router.push("/login");
    return <div></div>;
  }
  return <Home />;
};

export default HomePage;
