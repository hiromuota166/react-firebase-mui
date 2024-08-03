import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const RegistUser = () => {
  const [newName, setNewName] = useState<string>('');
  const [newReading, setNewReading] = useState<string>('');
  const [newFaculty, setNewFaculty] = useState<string>('');
  const [newStudentNum, setNewStudentNum] = useState<number | undefined>(undefined);
  const [newYear, setNewYear] = useState<number | undefined>(undefined);
  const [newCampus, setNewCampus] = useState<string>('');

  const addUser = async () => {
    try {
      await addDoc(collection(db, 'users'), {
        name: newName,
        reading: newReading,
        faculty: newFaculty,
        studentNum: newStudentNum,
        year: newYear,
        campus: newCampus,
      });
      setNewName('');
      setNewReading('');
      setNewFaculty('');
      setNewStudentNum(undefined);
      setNewYear(undefined);
      setNewCampus('');
      alert('メンバーが増えました');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleChangeStudentNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewStudentNum(value === '' ? undefined : parseFloat(value));
  };

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewYear(value === '' ? undefined : parseFloat(value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              id="outlined-basic" 
              label="名前" 
              variant="outlined"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              id="outlined-basic" 
              label="ふりがな" 
              variant="outlined"
              fullWidth
              value={newReading}
              onChange={(e) => setNewReading(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              id="outlined-basic" 
              label="学部" 
              variant="outlined"
              fullWidth
              value={newFaculty}
              onChange={(e) => setNewFaculty(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-number"
              label="学籍番号"
              type="number"
              fullWidth
              value={newStudentNum ?? ''}
              onChange={handleChangeStudentNum}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              id="outlined-basic" 
              label="学年" 
              type='number'
              fullWidth
              value={newYear ?? ''}
              onChange={handleChangeYear} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              id="outlined-basic" 
              label="キャンパス" 
              variant="outlined"
              fullWidth
              value={newCampus}
              onChange={(e) => setNewCampus(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" type='submit' fullWidth>
              追加
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegistUser;
