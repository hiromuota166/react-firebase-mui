import { Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material'
import React from 'react'

const OrderInputComponent = () => {

  const groups = [
    { id: 1, groupName: 'A' },
    { id: 2, groupName: 'B' },
    { id: 3, groupName: 'C' },
    { id: 4, groupName: 'D' },
  ]
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="delete-player-select-label">チーム名選択</InputLabel>
        <Select
          labelId="delete-player-select-label"
          id="delete-player-select"
          label="チーム名選択"
        >
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.groupName}>{group.groupName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
};

export default OrderInputComponent;