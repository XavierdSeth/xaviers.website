import { useEffect, useState } from "react";

function formatTime(timezone) {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function useLocalTime(timezone) {
  const [time, setTime] = useState(() => formatTime(timezone));

  useEffect(() => {
    const tick = () => setTime(formatTime(timezone));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return time;
}
