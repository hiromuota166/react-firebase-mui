import { useEffect, useState } from "react";
import supabase from '../supabase/createClient';
import { Box, Button, MenuItem, Select, TextField, FormControl, InputLabel, SelectChangeEvent, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

type PlayersType = {
  id?: string;
  name: string;  
  group_id?: string | null;
}

type GroupsType = {
  id: string;
  groupName: string;
}

const PlayerCrudComponent = () => {
  const [newPlayers, setNewPlayers] = useState<PlayersType[]>([]);
  const [players, setPlayers] = useState<PlayersType[]>([]);
  const [groups, setGroups] = useState<GroupsType[]>([]);
  const [name, setName] = useState<string>('');
  const [deletePlayerName, setDeletePlayerName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // 選手新規作成
  const createPlayer = async ({ name, group_id }: PlayersType) => {
    const { data, error } = await supabase.from('players').insert([{ name, group_id }]);

    if (error) {
      setError('選手の追加に失敗しました。');
      return;
    }

    if (data) {
      setNewPlayers([...newPlayers, ...data]);
      setName('');
      setError(null);
      getPlayers(); // 新しい選手を追加した後、選手リストを再取得
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

  // グループ一覧を取得する関数
  const getGroups = async () => {
    const { data, error } = await supabase.from('groups').select('*');

    if (error) {
      console.error('Error fetching groups:', error.message);
      setError('グループの取得に失敗しました。');
      return;
    }

    if (data) {
      setGroups(data);
    }
  };

  useEffect(() => {
    getPlayers();
    getGroups();
  }, []);

  const getGroupName = (groupId: string | null | undefined) => {
    if (!groupId) return '未所属';
    const group = groups.find(g => g.id === groupId);
    return group ? group.groupName : '未所属';
  };

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
              <TableCell align="right">グループ名</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="right">{getGroupName(player.group_id)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlayerCrudComponent;
