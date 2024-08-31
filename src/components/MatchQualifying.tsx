import React, { useEffect, useState } from 'react';
import { typeGroups } from '../types/type';
import supabase from '../supabase/createClient';
import { Box, Button, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Title from './Title';

const MatchQualifying = () => {
  const [groups, setGroups] = useState<typeGroups[]>([]);
  const [groupASelections, setGroupASelections] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // グループ名一覧取得
  const getGroupName = async () => {
    const { data, error } = await supabase.from('groups').select('*');

    if (error) {
      console.error('Error getting group name:', error.message);
      return;
    }

    if (data) {
      setGroups(data);
    }
  };

  useEffect(() => {
    getGroupName();
  }, []);

  const handleGroupAChange = (index: number, value: string) => {
    const newSelections = [...groupASelections];
    newSelections[index] = value;
    setGroupASelections(newSelections);
  };

  const updateGroupQualifying = async (groupId: string, qualifying: number) => {
    const { error } = await supabase.from('groups').update({ qualifying }).eq('id', groupId);

    if (error) {
      console.error('Error updating group qualifying:', error.message);
    }
  };

  const handleConfirmGroups = async () => {
    // グループAに選ばれたグループのqualifyingを1に更新
    for (const groupId of groupASelections) {
      if (groupId) {
        await updateGroupQualifying(groupId, 1);
      }
    }

    // 選ばれなかったグループのqualifyingを2に更新
    const remainingGroups = groups.filter(group => !groupASelections.includes(group.id));
    for (const group of remainingGroups) {
      await updateGroupQualifying(group.id, 2);
    }

    // 更新後、グループ情報を再取得
    getGroupName();
    setIsEditMode(false); // 編集モード終了
  };

  return (
    <Box>
      {isEditMode ? (
        // 編集モード
        <Box>
          <Title>予選Aグループ</Title>
          {Array.from({ length: 4 }).map((_, index) => (
            <FormControl key={`groupA-${index}`} fullWidth margin="normal">
              <InputLabel>グループ選択</InputLabel>
              <Select
                value={groupASelections[index] || ''}
                onChange={(e) => handleGroupAChange(index, e.target.value as string)}
              >
                {groups.map(group => (
                  <MenuItem key={group.id} value={group.id}>{group.groupName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
          <Button variant="contained" onClick={handleConfirmGroups}>グループA確定</Button>
          <Button variant="outlined" onClick={() => setIsEditMode(false)} sx={{ ml: 2 }}>キャンセル</Button>
        </Box>
      ) : (
        // 表示モード
        <Box>
          <Title>現在の予選グループ</Title>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>グループ名</TableCell>
                  <TableCell>予選グループ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map(group => (
                  <TableRow key={group.id}>
                    <TableCell>{group.groupName}</TableCell>
                    <TableCell>{group.qualifying === 1 ? '予選A' : '予選B'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={() => setIsEditMode(true)} sx={{ mt: 2 }}>
            編集
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MatchQualifying;
