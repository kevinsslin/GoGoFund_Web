import Image from "next/image";

import { CircularProgress, CircularProgressProps } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Clock from "../_components/Clock";

import NoSsr from '@mui/material/NoSsr';


function EventsIdPage() {

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} size="4rem"/>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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

  return (
    <main className="min-h-screen flex flex-col items-center ">
      <div className="flex justify-center flex-row">
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
          <p className="text-5xl font-bold p-4">name</p>
          <div className="flex flex-row items-center p-4">
            <CircularProgressWithLabel value={75} />
            <div className="pl-8">
              <p className="text-md pb-2">目標金額 NTD$ 100000</p>
              <p className="text-xl font-bold pt-2">已募集 NTD$ 100000</p>
            </div>
          </div>
          <p className="text-md p-2">募資期間 2023/12/26 12:00 – 2024/01/23 23:59</p>
          <NoSsr>
            <Clock targetDate="2023-12-31"/>
          </NoSsr>
          <button className="flex h-15 w-64 items-center justify-center rounded-2xl bg-dark-blue p-4 m-4 text-xl font-bold text-white">我要贊助</button>
        </div>
      </div>
      <div className="p-4 w-128 flex justify-end">
        <p className="text-2xl font-bold flex justify-start">Description</p>
        {/* <p className="text-xl break-all">description gowswfk;w ckasdmaf wefwkjfadc aefwjenfjwnfw efwejwwfjeqwrfnweref ewfwfwfr ertftwtwetft dsjsflsfvwsdf sefwefwe ffweefwef regwsgfwr ewfwefw</p> */}
      </div>
    </main>
  );
}

export default EventsIdPage;