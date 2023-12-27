"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";

function Navbar() {
  const router = useRouter();
  // const [open, setOpen] = useState(false);
  // const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToEvent = () => {
    router.push("/events");
  };

  const handleToManage = () => {
    router.push("/manage");
  };

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event: Event | React.SyntheticEvent) => {
  //   if (
  //     anchorRef.current &&
  //     anchorRef.current.contains(event.target as HTMLElement)
  //   ) {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // // return focus to the button when we transitioned from !open -> open
  // const prevOpen = useRef(open);

  // useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current!.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);

  return (
    <div className="pl-8 pr-8">
      <div className="flex flex-row items-center justify-between">
        <Image
          src="/logo.png"
          alt="GoGoFund Logo"
          width={400}
          height={250}
          onClick={handleToEvent}
          className="p-5 hover:cursor-pointer"
        />
        <div className="flex flex-row space-x-8">
          <Button variant="contained" className="h-10 text-xl text-black">
            Get Fund
          </Button>
          <FaUserCircle
            className="text-4xl hover:cursor-pointer"
            onClick={handleToManage}
          />
          {/* <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            Dashboard
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
