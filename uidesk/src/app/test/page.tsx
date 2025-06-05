'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type User = {
  id: number;
  name: string;
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('User')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setUsers(data);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
