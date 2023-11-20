import { useEffect, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{date.toLocaleTimeString()}</div>;
};

const ClientSideClock = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div>{isMounted ? <Clock /> : "Loading..."}</div>;
};

export default ClientSideClock;
