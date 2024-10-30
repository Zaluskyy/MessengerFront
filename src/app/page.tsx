"use client";

import styles from "./page.module.css";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";

export default function Home() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return <div className={styles.Home}></div>;
}
