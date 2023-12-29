"use client";

import { useRef, useState } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

function EditName({ amount }: { amount: number }) {
  const [dbevent, setdbevent] = useState({ amount: amount });
  const [edittingName, setEdittingName] = useState(false);
  const inputRef1 = useRef<HTMLInputElement | null>(null); // 修改這裡

  const handleUpdateName = async () => {
    if (!inputRef1.current) return;

    if (!inputRef1.current.value) {
      alert("List amount cannot be empty");
      return;
    }

    setdbevent({ amount: +inputRef1.current.value }); // 將字符串轉換為數字

    setEdittingName(false);
  };

  return (
    <>
      {edittingName ? (
        <ClickAwayListener onClickAway={handleUpdateName}>
          <Input
            autoFocus
            type="number"
            defaultValue={dbevent.amount}
            placeholder="Enter a new amount..."
            sx={{ width: "50%" }}
            inputRef={inputRef1}
          />
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => setEdittingName(true)}
          className="w-[50%] rounded-md p-2 hover:bg-white/10"
        >
          <Typography className="break-all text-start text-lg">
            {dbevent.amount}
          </Typography>
        </button>
      )}
    </>
  );
}

export default EditName;
