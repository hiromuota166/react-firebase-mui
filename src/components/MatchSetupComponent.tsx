import React, { useEffect, useState } from 'react';
import supabase from '../supabase/createClient';
import { Box, Button, Typography } from '@mui/material';
import Title from './Title';

type GroupType = {
  id: string;
  groupName: string;
  qualifying: number | null;
  final_stage: boolean | null;
};

const MatchSetupComponent = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);

  // グループデータを取得する関数
  const getGroups = async () => {
    const { data, error } = await supabase.from('groups').select('*');
    if (error) {
      console.error('Error fetching groups:', error.message);
      return;
    }
    if (data) {
      setGroups(data);
    }
  };

  // 総当たり戦の組み合わせを生成する関数
  const generateRoundRobinMatches = (group: GroupType[], startMatchNum: number) => {
    let matches = [];
    let matchNum = startMatchNum;  // match_numフィールドを開始値から設定

    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        matches.push({
          group1_id: group[i].id,
          group2_id: group[j].id,
          match_num: matchNum++,  // match_numを設定
          winner_id: null,  // 試合前なので勝者なし
        });
      }
    }
    return matches;
  };

  // 予選グループの総当たり戦を設定する関数
  const setupQualifyingMatches = async () => {
    const groupA = groups.filter(group => group.qualifying === 1);
    const groupB = groups.filter(group => group.qualifying === 2);

    // 予選Aのmatch_numは1から開始
    const groupAMatches = generateRoundRobinMatches(groupA, 1);
    // 予選Bのmatch_numは7から開始
    const groupBMatches = generateRoundRobinMatches(groupB, 7);

    // matchesテーブルに挿入
    const { error: errorA } = await supabase.from('matches').insert(groupAMatches);
    const { error: errorB } = await supabase.from('matches').insert(groupBMatches);

    if (errorA || errorB) {
      console.error('Error inserting matches:', errorA?.message || errorB?.message);
      return;
    }

    setIsSetupComplete(true);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Box>
      <Title>予選グループの試合をセットアップ</Title>
      {isSetupComplete ? (
        <Typography variant="h6">予選の試合がセットアップされました！</Typography>
      ) : (
        <Button variant="contained" color="primary" onClick={setupQualifyingMatches}>
          予選の試合をセットアップ
        </Button>
      )}
    </Box>
  );
};

export default MatchSetupComponent;
