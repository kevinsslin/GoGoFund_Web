import Image from "next/image";

import Clock from "../../../components/Clock";
import ProductIntro from "../../../components/ProductIntro";
import { CircularProgress } from "@mui/material";
import type { CircularProgressProps } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import NoSsr from "@mui/material/NoSsr";
import Typography from "@mui/material/Typography";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} size="4rem" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="dark-blue"
          className="text-xl font-bold"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function EventsIdPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-row justify-center">
        <div className="pr-24">
          <Image
            src="/events.jpeg"
            alt="event"
            width={400}
            height={400}
            className="p-5 "
          />
        </div>
        <div>
          <p className="break-all p-4 text-6xl font-bold">name</p>
          <div className="flex flex-row items-center p-4">
            <CircularProgressWithLabel value={75} />
            <div className="pl-8">
              <p className="text-md pb-2">目標金額 NTD$ 100000</p>
              <p className="pt-2 text-xl font-bold">已募集 NTD$ 100000</p>
            </div>
          </div>
          <p className="text-md p-2">
            募資期間 2023/12/26 12:00 – 2024/01/23 23:59
          </p>
          <NoSsr>
            <Clock targetDate="2023-12-31" />
          </NoSsr>
          <button className="h-15 m-4 flex w-64 items-center justify-center rounded-2xl bg-dark-blue p-4 text-xl font-bold text-white">
            我要贊助
          </button>
        </div>
      </div>
      <div className="flex w-[50%] flex-col justify-start p-8">
        <p className="flex justify-start p-2 text-4xl font-bold">Description</p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1 }}
        />
        <p className="break-all p-2 text-xl">
          description gowswfk;w ckasdmaf wefwkjfadc aefwjenfjwnfw
          efwejwwfjeqwrfnweref ewfwfwfr ertftwtwetft dsjsflsfvwsdf sefwefwe
          ffweefwef regwsgfwr ewfwefw
        </p>
      </div>
      <div className="justify-cent flex w-[50%] flex-col p-8">
        <ProductIntro />
      </div>
    </main>
  );
}

export default EventsIdPage;
