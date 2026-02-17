import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const USERS_PATH = path.join(__dirname, '../../data/users.json');

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const readUsers = async (): Promise<User[]> => {
  const data = await fs.readFile(USERS_PATH, 'utf-8');
  return JSON.parse(data);
};

const writeUsers = async (users: User[]) => {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
};

export const signup = async (name: string, email: string, password: string) => {
  const users = await readUsers();

  const exists = users.find(u => u.email === email);
  if (exists) {
    throw new Error('Email already registered');
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: uuid(),
    name,
    email,
    password: hashed,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

export const login = async (email: string, password: string) => {
  const users = await readUsers();

  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid credentials');
  }

  return { id: user.id, name: user.name, email: user.email };
};
