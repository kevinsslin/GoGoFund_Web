"use client";

import { useRef, useEffect, useState } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

function EditName({name}: { name: string }) {
  const [dbevent, setdbevent] = useState({ name: name });
  const [edittingName, setEdittingName] = useState(false);
  const inputRef1 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edittingName && inputRef1.current) {
      inputRef1.current.value = dbevent.name;
    }
  }, [edittingName, dbevent.name]); // Update input value when editingName or dbevent.name changes

  const handleUpdateName = async () => {
    if (!inputRef1.current) return;

    if (!inputRef1.current.value) {
      alert("List name cannot be empty");
      return;
    }

    setdbevent({ name: inputRef1.current.value });

    setEdittingName(false);
  };

  return (
    <>
      {edittingName ? (
        <ClickAwayListener onClickAway={handleUpdateName}>
          <Input
            autoFocus
            defaultValue={dbevent.name}
            className="p-2 text-2xl"
            placeholder="Enter a new name..."
            sx={{ width: "100%" }}
            inputRef={inputRef1}
          />
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => setEdittingName(true)}
          className="w-full rounded-md p-2 hover:bg-white/10"
        >
          <Typography className="break-all text-start text-5xl font-bold">
            {dbevent.name}
          </Typography>
        </button>
      )}
    </>
  );
}

export default EditName;
