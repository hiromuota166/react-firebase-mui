import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, Button, Typography, Alert, TextField } from '@mui/material';
import supabase from '../supabase/createClient';
import { Database } from '../types/database.types';

type GroupType = Database['public']['Tables']['groups']['Row'];

const IntroQuizScoreInput = () => {
  const [selectedGroup, setSelectedGroup] = useState<string[]>(Array(8).fill(''));
  const [bonusPoints, setBonusPoints] = useState<number[]>(Array(8).fill(0));
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

  // ボーナスポイントの変更ハンドラ
  const handleBonusPointsChange = (index: number, value: string) => {
    const newBonusPoints = [...bonusPoints];
    newBonusPoints[index] = parseInt(value, 10) || 0;
    setBonusPoints(newBonusPoints);
  };

  // 点数を送信する関数
  const submitScores = async () => {
    try {
      for (let i = 0; i < selectedGroup.length; i++) {
        const groupName = selectedGroup[i];
        if (groupName) {
          const group = groups.find((g) => g.groupName === groupName);
          if (group) {
            const score = 8 - i + bonusPoints[i]; // 順位に基づく点数とボーナスポイントを加算
            const { error } = await supabase
              .from('groups')
              .update({ intro_quiz_score: score })
              .eq('id', group.id);

            if (error) throw error;
          }
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
      {Array.from({ length: 8 }, (_, i) => (
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
          <TextField
            label="ボーナスポイント"
            type="number"
            value={bonusPoints[i]}
            onChange={(e) => handleBonusPointsChange(i, e.target.value)}
            sx={{ width: '80px', mr: 2 }}
          />
          <Typography variant="body1">{`点数: ${8 - i + bonusPoints[i]}点`}</Typography>
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

export default IntroQuizScoreInput;
