import { useState } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useAccount } from "wagmi";

import { updateEvent } from "./actions";

type Props = {
  eventTitle: string;
  eventId: string;
};

function EditTitle({ eventTitle, eventId }: Props) {
  const [currentTitle, setCurrentTitle] = useState(eventTitle);
  const [editingTitle, setEditingTitle] = useState(false);

  const { address } = useAccount();

  const handleUpdateTitle = async () => {
    if (currentTitle === "") {
      alert("List title cannot be empty");
      return;
    }

    const updatedEvent = await updateEvent(address, eventId, {
      title: currentTitle,
    });
    if (updatedEvent) {
      setCurrentTitle(updatedEvent.title);
    }
    setEditingTitle(false);
  };

  return (
    <>
      {editingTitle ? (
        <ClickAwayListener onClickAway={handleUpdateTitle}>
          <Input
            autoFocus
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            placeholder="Enter a new title..."
            sx={{ width: "100%" }}
          />
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => setEditingTitle(true)}
          className="w-full rounded-md p-2 hover:bg-white/10"
        >
          <Typography className="break-all text-start text-5xl font-bold">
            {currentTitle != null ? currentTitle : eventTitle}
          </Typography>
        </button>
      )}
    </>
  );
}

export default EditTitle;
