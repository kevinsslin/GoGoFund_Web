import Image from "next/image";

import EditAmount from "../_components/EditAmount";
import EditDescription from "../_components/EditDescription";
import EditName from "../_components/EditName";
import NFTDialog from "../_components/NFTDialog";
import Divider from "@mui/material/Divider";

function EventsIdPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-[50%] flex-col justify-start pb-8 pl-8 pr-8">
        <p className="flex justify-start p-2 text-4xl font-bold">Information</p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1 }}
        />
      </div>
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
          <EditName />
          <div className="flex flex-col p-2">
            <div className="flex flex-row space-x-4">
              <p className="flex items-center justify-center text-lg">
                目標金額 NTD$
              </p>
              <EditAmount />
            </div>
            <p className="pt-2 text-lg">已募集 NTD$ 100000</p>
          </div>
          <p className="p-2 text-lg">
            募資期間 2023/12/26 12:00 – 2024/01/23 23:59
          </p>
          <NFTDialog />
        </div>
      </div>
      <div className="flex w-[50%] flex-col justify-start p-8">
        <p className="flex justify-start p-2 text-4xl font-bold">Description</p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1 }}
        />
        <EditDescription />
      </div>
    </main>
  );
}

export default EventsIdPage;
