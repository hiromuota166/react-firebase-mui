import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { Member } from '../types/type'

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
      })
      setNewName('');
      setNewReading('');
      setNewFaculty('');
      setNewStudentNum(undefined);
      setNewYear(undefined);
      setNewCampus('');
      alert('メンバーが増えました')
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleChangeStudentNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewStudentNum(value == '' ? undefined : parseFloat(value));
  }

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewYear(value == '' ? undefined : parseFloat(value));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser();
  }
  return (
    <div>
      <form action="post" onSubmit={handleSubmit}>
        <TextField 
          id="outlined-basic" 
          label="名前" 
          variant="outlined"
          value={newName}
          onChange={(e) => setNewName(e.target.value)} 
          />
        <TextField 
          id="outlined-basic" 
          label="ふりがな" 
          variant="outlined"
          value={newReading}
          onChange={(e) => setNewReading(e.target.value)} 
          />
        <TextField 
          id="outlined-basic" 
          label="学部" 
          variant="outlined"
          value={newFaculty}
          onChange={(e) => setNewFaculty(e.target.value)} 
          />
        <TextField
          id="outlined-number"
          label="学籍番号"
          type="number"
          value={newStudentNum ?? ''}
          onChange={handleChangeStudentNum}
          />
        <TextField 
          id="outlined-basic" 
          label="学年" 
          type='number'
          value={newYear ?? ''}
          onChange={handleChangeYear} 
          />
        <TextField 
          id="outlined-basic" 
          label="キャンパス" 
          variant="outlined"
          value={newCampus}
          onChange={(e) => setNewCampus(e.target.value)} 
          />
          <Button variant="outlined" type='submit'>Outlined</Button>
      </form>
    </div>
  )
}

export default RegistUser