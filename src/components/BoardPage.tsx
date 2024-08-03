import { Box, TextField, Button, Paper, Typography, Grid, FormLabel } from '@mui/material';
import { getDocs, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Board } from '../types/type';
import { ReactElement, useEffect, useState } from 'react';

const BoardPage = () => {
  const [allBoard, setAllBoard] = useState<Board[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newText, setNewText] = useState<string>('');

  const addBoard = async () => {
    try {
      const docRef = await addDoc(collection(db, 'board'), {
        title: newTitle,
        text: newText,
      });
      setNewTitle('');
      setNewText('');
      getBoard();
    } catch (error) {
      console.error('Error addBoard: ', error);
    }
  }

  const getBoard = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'board'));
      const boardList: Board[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          text: data.text,
        }
      });
      setAllBoard(boardList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBoard();
  }

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: 2 }}>
      <Box sx={{ flex: 1, padding: 2 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant='outlined'
              fullWidth
              rows={2}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              >
            </TextField>
            <TextField
              label="New Post"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ marginTop: 2 }}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              type='submit'
            >
              Post
            </Button>
          </form>
        </Paper>
      </Box>
      <Box sx={{ flex: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {allBoard.map((board) => (
            <Grid item xs={12} key={board.id}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h5">{board.title}</Typography>
                <Typography variant="body1">{board.text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default BoardPage