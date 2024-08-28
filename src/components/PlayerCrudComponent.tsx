import { useEffect, useState } from "react";
import supabase from '../supabase/createClient';
import { Box, Button, MenuItem, Select, TextField, FormControl, InputLabel, SelectChangeEvent, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

type PlayersType = {
  id?: string;
  name: string;  
  group_id?: string | null;
}

const PlayerCrudComponent = () => {
  const [newPlayers, setNewPlayers] = useState<PlayersType[]>([]);
  const [players, setPlayers] = useState<PlayersType[]>([]);
  const [name, setName] = useState<string>('');
  const [deletePlayerName, setDeletePlayerName] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // エラーメッセージの状態を追加

  // 選手新規作成
  const createPlayer = async ({ name, group_id }: PlayersType) => {
    const { data, error } = await supabase.from('players').insert([{ name, group_id }]);

    if (error) {
      console.error('Error adding player:', error.message);
      setError('選手の追加に失敗しました。');
      return;
    }

    if (data) {
      setNewPlayers([...newPlayers, ...data]);
      setName('');
      setError(null); // 成功時にエラーメッセージをクリア
    }
  };

  const handleChangeNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddPlayer = () => {
    if (name) {
      createPlayer({ name });
    } else {
      setError("選手名を入力してください。");
    }
  };

  const handleChangeDelete = (e: SelectChangeEvent<string>) => {
    setDeletePlayerName(e.target.value);
  }

  // 選手を削除する関数
  const deletePlayer = async (name: string) => {
    const { error } = await supabase.from('players').delete().eq('name', name);

    if (error) {
      console.error('Error deleting player:', error.message);
      setError('選手の削除に失敗しました。');
      return;
    }

    // 削除成功時にプレイヤーリストを再取得
    getPlayers();
    setDeletePlayerName('');
    setError(null);
  };

  const handleDeletePlayer = () => {
    if (deletePlayerName) {
      deletePlayer(deletePlayerName);
    }
  };

  // 選手一覧を取得する関数
  const getPlayers = async () => {
    const { data, error } = await supabase.from('players').select('*');

    if (error) {
      console.error('Error fetching players:', error.message);
      setError('選手の取得に失敗しました。');
      return;
    }

    if (data) {
      setPlayers(data);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <Box p={3}>
      <Box mb={3}>
        <TextField 
          id="standard-basic" 
          label="選手名" 
          variant="standard" 
          value={name} 
          onChange={handleChangeNew}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddPlayer} sx={{ mt: 2 }}>
          選手追加
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel id="delete-player-select-label">削除したい選手名</InputLabel>
          <Select
            labelId="delete-player-select-label"
            id="delete-player-select"
            value={deletePlayerName}
            onChange={handleChangeDelete}
            label="削除したい選手名"
          >
            {players.map((player) => (
              <MenuItem key={player.id} value={player.name}>{player.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={handleDeletePlayer} sx={{ mt: 2 }}>
          選手削除
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>選手名</TableCell>
              <TableCell align="right">グループID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="right">{player.group_id || '未所属'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlayerCrudComponent;
