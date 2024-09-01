import React, { useState, useEffect } from 'react';
import supabase from '../supabase/createClient'; // Supabaseのクライアントをインポート
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Group = {
  id: string;
  groupName: string;
};

type GroupSelectorProps = {
  onSelectGroup: (groupId: string) => void;
  selectedGroup: string;
};

const GroupSelector: React.FC<GroupSelectorProps> = ({ onSelectGroup, selectedGroup }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    // グループのデータを取得
    const fetchGroups = async () => {
      const { data, error } = await supabase.from('groups').select('*').order('groupName');
      if (error) {
        console.error('Error fetching groups:', error.message);
        return;
      }
      setGroups(data || []);
    };

    fetchGroups();
  }, []);

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>グループを選択</InputLabel>
      <Select
        value={selectedGroup}
        onChange={(e) => onSelectGroup(e.target.value)}
        label="グループを選択"
      >
        {groups.map((group) => (
          <MenuItem key={group.id} value={group.id}>
            {group.groupName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GroupSelector;
