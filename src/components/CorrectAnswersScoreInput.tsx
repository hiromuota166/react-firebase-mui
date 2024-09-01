import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import supabase from '../supabase/createClient';
import { Database } from '../types/database.types';

type GroupType = Database['public']['Tables']['groups']['Row'];

const CorrectAnswersScoreInput = ({ gameType }: { gameType: string }) => {
  const [correctAnswers, setCorrectAnswers] = useState<number[]>(Array(8).fill(0));
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

  // 点数を送信する関数
  const submitScores = async () => {
    try {
      for (let i = 0; i < groups.length; i++) {
        const groupId = groups[i].id;
        const score = correctAnswers[i] * 2;

        const { error } = await supabase
          .from('groups')
          .update({ [gameType]: score })
          .eq('id', groupId);

        if (error) throw error;
      }

      setSuccessMessage('点数が正常に保存されました。');
      setErrorMessage(null);
    } catch (error: any) {
      console.error('Error updating scores:', error.message);
      setErrorMessage('点数の保存に失敗しました。');
      setSuccessMessage(null);
    }
  };

  // 正解数の変更ハンドラ
  const handleCorrectAnswersChange = (index: number, value: string) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[index] = parseInt(value, 10) || 0;
    setCorrectAnswers(newCorrectAnswers);
  };

  return (
    <Box>
      {groups.map((group, i) => (
        <Box key={group.id} display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ width: '100px' }}>{group.groupName}</Typography>
          <TextField
            label="正解数" // ラベルを追加
            type="number"
            value={correctAnswers[i]}
            onChange={(e) => handleCorrectAnswersChange(i, e.target.value)}
            sx={{ mr: 2, width: '80px' }}
          />
          <Typography variant="body1">{`点数: ${correctAnswers[i] * 2}点`}</Typography>
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

export default CorrectAnswersScoreInput;
