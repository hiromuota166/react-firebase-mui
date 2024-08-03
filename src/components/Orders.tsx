import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { Member } from '../types/type';

const Orders = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const getMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const memberList : Member[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          reading: data.reading,
          faculty: data.faculty,
          studentNum: data.studentNum,
          year: data.year,
          campus: data.campus,
        }
      })
      setMembers(memberList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    getMembers();
  }, []);
  return (
    <React.Fragment>
      <Title>メンバーリスト</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell>よみがな</TableCell>
            <TableCell>学部</TableCell>
            <TableCell>学籍番号</TableCell>
            <TableCell>学年</TableCell>
            <TableCell>キャンパス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.reading}</TableCell>
              <TableCell>{member.faculty}</TableCell>
              <TableCell>{member.studentNum}</TableCell>
              <TableCell>{member.year}</TableCell>
              <TableCell>{member.campus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Orders;