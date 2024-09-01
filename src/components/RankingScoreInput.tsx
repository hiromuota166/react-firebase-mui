import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Box, Typography, Button, Alert } from '@mui/material';
import supabase from '../supabase/createClient';
import { Database } from '../types/database.types';

type GroupType = Database['public']['Tables']['groups']['Row'];

const RankingScoreInput = ({ gameType, scoreMapping }: { gameType: string; scoreMapping: number[] }) => {
  const [selectedGroup, setSelectedGroup] = useState<string[]>(Array(scoreMapping.length).fill(''));
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // グループ名を取得する関数
  const fetchGroups = async () => {
    const { data, error } = await supabase.from('groups').select('*').order('groupName');

    if (error) {
      console.error('Error fetching groups:', error.message);
      return;
    }

    if (data) {
      setGroups(data as GroupType[]);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // グループ選択の変更ハンドラ
  const handleGroupChange = (index: number, value: string) => {
    const newSelectedGroups = [...selectedGroup];
    newSelectedGroups[index] = value;
    setSelectedGroup(newSelectedGroups);
  };

  // 点数を送信する関数
  const submitScores = async () => {
    try {
      for (let i = 0; i < selectedGroup.length; i++) {
        const groupName = selectedGroup[i];
        const score = scoreMapping[i];

        if (groupName) {
          const { error } = await supabase
            .from('groups')
            .update({ [gameType]: score })
            .eq('groupName', groupName);

          if (error) throw error;
        }
      }

      setSuccessMessage('点数が正常に保存されました。');
      setErrorMessage(null);
    } catch (error: any) {
      console.error('Error updating scores:', error.message);
      setErrorMessage('点数の保存に失敗しました。');
      setSuccessMessage(null);
    }
  };

  return (
    <Box>
      {scoreMapping.map((score, i) => (
        <Box key={i} display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ width: '50px' }}>{`${i + 1}位`}</Typography>
          <Select
            value={selectedGroup[i]}
            onChange={(e) => handleGroupChange(i, e.target.value as string)}
            displayEmpty
            sx={{ minWidth: '150px', mr: 2 }}
          >
            <MenuItem value="">選択してください</MenuItem>
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.groupName}>
                {group.groupName}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body1">{`${score}点`}</Typography>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={submitScores}>
        点数を保存
      </Button>
      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default RankingScoreInput;
