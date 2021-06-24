import { useRouter } from "next/router";
import Show from "../../components/Show";

type nmstr = number | string;

export default function Home() {
  const { timezone, time } = useRouter().query;
  const dt = new Date();

  if (!timezone || !time) {
    return <></>;
  }

  const pad = (n: nmstr, k: number = 2) => String(n).padStart(k, "0");
  const fmt = (
    yr: nmstr,
    mn: nmstr,
    dt: nmstr,
    tm: string | string[],
    tz: string | string[]
  ) =>
    `${pad(yr, 4)}-${pad(mn)}-${pad(dt)}T${tm.slice(0, 2)}:${tm.slice(2)}${tz}`;

  const date = new Date(
    fmt(dt.getFullYear(), dt.getMonth() + 1, dt.getDate(), time, timezone)
  );

  const tzParse = (tz: string | string[]) => {
    return [Number(tz.slice(0, 3)), Number(tz.slice(3))];
  };

  const userTz = () => {
    const offset = -1 * new Date().getTimezoneOffset();
    const sign = offset < 0 ? "-" : "+";

    const hr = String(Math.floor(offset / 60)).padStart(2, "0");
    const min = String(offset % 60).padStart(2, "0");

    return sign + hr + min;
  };

  const timeDiff = (tz1: string | string[], tz2: string | string[]) => {
    const ptz1 = tzParse(tz1),
      ptz2 = tzParse(tz2);

    const hourDiff = ptz1[0] - ptz2[0];
    const minDiff = ptz1[1] - ptz2[1];
    return hourDiff * 60 + minDiff;
  };

  const isDifferentDay = (diff) => {
    const hr = Number(time.slice(0, 2));
    const m = Number(time.slice(2));
    const min = hr * 60 + m;
    console.log({ hr, m, min });
    return Math.abs(diff) > min;
  };

  const tDiff = timeDiff(timezone, userTz());
  const diffDay = isDifferentDay(tDiff);
  console.log({ tDiff, diffDay });
  if (diffDay) {
    if (tDiff / Math.abs(tDiff) == -1) {
      date.setDate(date.getDate() - 1);
    }
  }

  return (
    <Show
      date={date.toLocaleDateString()}
      time={date.toLocaleTimeString("en-US")}
      timezone="UTC+0530"
    />
  );
}
