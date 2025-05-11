import { Agent } from './agent.interface';
import { Client } from './client.interface';

export interface AppUser {
    id?: number; // Optional for new users
    username: string;
    password: string;
    role: Role;
    agent?: Agent;
    client?: Client;
  }

export type Role = 'ROLE_CLIENT' | 'ROLE_AGENT';