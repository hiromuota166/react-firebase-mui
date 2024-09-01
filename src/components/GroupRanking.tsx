import React from 'react';
import { Box, Typography } from '@mui/material';
import { Database } from '../types/database.types';

type GroupType = Database['public']['Tables']['groups']['Row'];

interface GroupRankingProps {
  groups: GroupType[];
}

const GroupRanking: React.FC<GroupRankingProps> = ({ groups }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>グループ順位</Typography>
      {groups.map((group) => (
        <Box key={group.id} display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1">{group.groupName}</Typography>
          <Typography variant="body1">
            {`総得点: ${[
              group.intro_quiz_score ?? 0,
              group.whisper_game_score ?? 0,
              group.bingo_score ?? 0,
              group.unique_answers_score ?? 0,
              group.tennis_tournament_score ?? 0,
            ].reduce((acc, score) => acc + score, 0)} 点`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default GroupRanking;
