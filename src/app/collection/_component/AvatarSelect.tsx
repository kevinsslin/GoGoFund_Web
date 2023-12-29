import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import { LuTreePine, LuCitrus ,LuFlame, LuHop } from "react-icons/lu";
import { DialogContent, DialogTitle } from '@mui/material';

const AvatarSelector = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<React.ReactElement | null>(null);

  const handleAvatarClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleIconClick = (iconComponent: React.ReactElement) => {
    setSelectedIcon(iconComponent);
    setOpenDialog(false);
  };

  return (
    <div>
      <Avatar
        sx={{ width: 300, height: 300, cursor: 'pointer' }}
        onClick={handleAvatarClick}
        className='corsor-pointer hover:bg-dark-gray'
      >
        {selectedIcon && React.cloneElement(selectedIcon, { sx: { width: 200, height: 200 } })}
      </Avatar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Change Advator</DialogTitle>
        <DialogContent className='flex flex-row space-x-8 p-8 m-4'>
          <Avatar onClick={() => handleIconClick(<LuCitrus style={{ fontSize: '12rem' }}/>)} sx={{ width: 100, height: 100 }} className='corsor-pointer hover:bg-dark-gray'>
            <LuCitrus className="text-6xl"/>
          </Avatar>
          <Avatar onClick={() => handleIconClick(<LuFlame style={{ fontSize: '12rem' }}/>)} sx={{ width: 100, height: 100 }} className='corsor-pointer hover:bg-dark-gray'>
            <LuFlame className="text-6xl"/>
          </Avatar>
          <Avatar onClick={() => handleIconClick(<LuHop style={{ fontSize: '12rem' }}/>)} sx={{ width: 100, height: 100 }} className='corsor-pointer hover:bg-dark-gray'>
            <LuHop className="text-6xl"/>
          </Avatar>
          <Avatar onClick={() => handleIconClick(<LuTreePine style={{ fontSize: '12rem' }}/>)} sx={{ width: 100, height: 100 }} className='corsor-pointer hover:bg-dark-gray'>
            <LuTreePine className="text-6xl"/>
          </Avatar>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvatarSelector;
