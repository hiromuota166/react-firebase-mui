import React, { useEffect, useState } from 'react';
import supabase from '../supabase/createClient';
import { typeGroups } from '../types/type';
import { Box, Button, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Title from './Title';

const MatchFinal = () => {
  const [groups, setGroups] = useState<typeGroups[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
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

  const handleGroupChange = (index: number, value: string) => {
    const newSelections = [...selectedGroups];
    newSelections[index] = value;
    setSelectedGroups(newSelections);
  };

  const updateGroupFinalStage = async (groupId: string, final_stage: boolean) => {
    const { error } = await supabase.from('groups').update({ final_stage }).eq('id', groupId);

    if (error) {
      console.error('Error updating group final stage:', error.message);
    }
  };

  const handleConfirmFinals = async () => {
    // 決勝進出グループを更新
    const finalGroupIds = selectedGroups.filter(Boolean); // 選択されたグループIDのみを取得

    // すべてのグループのfinal_stageをリセット
    for (const group of groups) {
      await updateGroupFinalStage(group.id, false);
    }

    // 選択されたグループのfinal_stageをtrueに設定
    for (const groupId of finalGroupIds) {
      await updateGroupFinalStage(groupId, true);
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
          <Title>決勝進出グループを選択</Title>
          <FormControl fullWidth margin="normal">
            <InputLabel>Aグループ1位</InputLabel>
            <Select
              value={selectedGroups[0] || ''}
              onChange={(e) => handleGroupChange(0, e.target.value as string)}
            >
              {groups.filter(group => group.qualifying === 1).map(group => (
                <MenuItem key={group.id} value={group.id}>{group.groupName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Aグループ2位</InputLabel>
            <Select
              value={selectedGroups[1] || ''}
              onChange={(e) => handleGroupChange(1, e.target.value as string)}
            >
              {groups.filter(group => group.qualifying === 1).map(group => (
                <MenuItem key={group.id} value={group.id}>{group.groupName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Bグループ1位</InputLabel>
            <Select
              value={selectedGroups[2] || ''}
              onChange={(e) => handleGroupChange(2, e.target.value as string)}
            >
              {groups.filter(group => group.qualifying === 2).map(group => (
                <MenuItem key={group.id} value={group.id}>{group.groupName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Bグループ2位</InputLabel>
            <Select
              value={selectedGroups[3] || ''}
              onChange={(e) => handleGroupChange(3, e.target.value as string)}
            >
              {groups.filter(group => group.qualifying === 2).map(group => (
                <MenuItem key={group.id} value={group.id}>{group.groupName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleConfirmFinals}>決勝進出確定</Button>
          <Button variant="outlined" onClick={() => setIsEditMode(false)} sx={{ ml: 2 }}>キャンセル</Button>
        </Box>
      ) : (
        // 表示モード
        <Box>
          <Title>現在の決勝進出グループ</Title>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>グループ名</TableCell>
                  <TableCell>決勝進出</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map(group => (
                  <TableRow key={group.id}>
                    <TableCell>{group.groupName}</TableCell>
                    <TableCell>{group.final_stage ? '決勝進出' : '予選敗退'}</TableCell>
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

export default MatchFinal;
