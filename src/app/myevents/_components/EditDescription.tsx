import { useState } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useAccount } from "wagmi";

import { updateEvent } from "./actions";

function EditDescription({
  eventDescription,
  eventId,
}: {
  eventDescription: string;
  eventId: string;
}) {
  const [currentDescription, setCurrentDescription] =
    useState(eventDescription);
  const [editingDescription, setEditingDescription] = useState(false);

  const { address } = useAccount();

  const handleUpdateDesc = async () => {
    if (currentDescription === "") {
      alert("List description cannot be empty");
      return;
    }

    const updatedEvent = await updateEvent(address, eventId, {
      description: currentDescription,
    });
    if (updatedEvent) {
      setCurrentDescription(updatedEvent.description);
    }
    setEditingDescription(false);
  };

  return (
    <>
      {editingDescription ? (
        <ClickAwayListener onClickAway={handleUpdateDesc}>
          <Input
            autoFocus
            type="text"
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            placeholder="Enter a new description..."
            sx={{ fontSize: "2rem", width: "100%" }}
            multiline
            rows={3}
          />
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => {
            setCurrentDescription(eventDescription); // Reset description to the latest value when starting editing
            setEditingDescription(true);
          }}
          className="w-full rounded-md p-2 hover:bg-white/10"
        >
          <Typography className="break-all p-2 text-start text-xl">
            {currentDescription != null ? currentDescription : eventDescription}
          </Typography>
        </button>
      )}
    </>
  );
}

export default EditDescription;
