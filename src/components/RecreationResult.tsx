import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RankingScoreInput from './RankingScoreInput';
import CorrectAnswersScoreInput from './CorrectAnswersScoreInput';
import IntroQuizScoreInput from './IntroQuizScoreInput';
import GroupRanking from './GroupRanking';
import { Box, Grid } from '@mui/material';
import supabase from '../supabase/createClient';
import { useEffect, useState } from 'react';
import { Database } from '../types/database.types';

type GroupType = Database['public']['Tables']['groups']['Row'];

export default function RecreationResult() {
  const [groups, setGroups] = useState<GroupType[]>([]);

  // グループデータを取得する関数
  const fetchGroups = async () => {
    const { data, error } = await supabase.from('groups').select('*').order('groupName');

    if (error) {
      console.error('Error fetching groups:', error.message);
      return;
    }

    if (data) {
      // 型を補完する
      const completeData = data.map(group => ({
        ...group,
        final_stage: group.final_stage ?? false,
        qualifying: group.qualifying ?? 0,
      })) as GroupType[];

      setGroups(completeData);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* アコーディオン部分 */}
      <Grid item xs={8}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            イントロどん
          </AccordionSummary>
          <AccordionDetails>
            <IntroQuizScoreInput />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            伝言ゲーム
          </AccordionSummary>
          <AccordionDetails>
            <CorrectAnswersScoreInput gameType="whisper_game_score" />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            BINGO
          </AccordionSummary>
          <AccordionDetails>
            <RankingScoreInput gameType="bingo_score" scoreMapping={[4, 3, 2, 1, 0, 0, 0, 0]} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            みんなで被るな！
          </AccordionSummary>
          <AccordionDetails>
            <CorrectAnswersScoreInput gameType="unique_answers_score" />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            テニス団体戦
          </AccordionSummary>
          <AccordionDetails>
            <CorrectAnswersScoreInput gameType="tennis_tournament_score" />
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* グループ順位部分 */}
      <Grid item xs={4}>
        <Box>
          <GroupRanking groups={groups} />
        </Box>
      </Grid>
    </Grid>
  );
}
