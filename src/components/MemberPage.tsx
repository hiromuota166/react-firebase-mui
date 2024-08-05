import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import RegistUser from './RegistUser';
import Title from './Title';

type Member = {
  id: string;
  name: string;
  age: number;
};

const MemberPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [updateUserName, setUpdateUserName] = useState<string>('');
  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const membersList: Member[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          age: data.age,
        }
      });
      // console.log(membersList)
      setMembers(membersList);
    } catch (error) {
      console.error('Error fetching members: ', error);
    }
  }

  const updateUsers = async () => {
    try {
      if (selectedUserId) {
        await updateDoc(doc(db, 'users', selectedUserId), {
          name: updateUserName,
        });
        getUsers();
      }
    } catch (error) {
      console.error('Error update member: ', error)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Title>メンバー追加</Title>
      <RegistUser/>
      {/* <form 
        action="post" 
        onSubmit={handleSubmit}
      >
        <select 
          name="members"
          onChange={(e) => setSelectedUserId(e.target.value)}
          value={selectedUserId}
          >
          <option value="">選択してください</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        <input 
          type="text"
          value={updateUserName}
          onChange={(e) => setUpdateUserName(e.target.value)}
          />
        <button type='submit'>
          <p>更新</p>
        </button>
      </form> */}
    </div>
  );
};

export default MemberPage;
