import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import React, { useState, useEffect } from 'react'

type Members = {
  id: string;
  name: string;
  age: number;
}

const GetUsers = () => {
  const [members, setMembers] = useState<Members[]>([]);
  const getMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const memberList: Members[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          age: data.age,
        }
      });
      setMembers(memberList)
    } catch (error) {
      console.error('Error fetching members', error);
    }
  }

  useEffect(() => {
    getMembers();
  }, []);
  return (
    <div>
      <h1>現在のメンバーリストはこちら</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <p>{member.name}</p>
            <p>{member.age}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GetUsers