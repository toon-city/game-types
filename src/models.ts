import { Point } from './common';

// ─── Shared domain models ─────────────────────────────────────────────────────

export type RoomType = 'PUBLIC' | 'PRIVATE';
export type HouseAccess = 'OPEN' | 'PASSWORD' | 'CLOSED';

/** Authenticated user info (returned by the server after token validation) */
export interface UserInfo {
  id: string;
  username: string;
  /** Avatar appearance options at the time of spawn */
  avatarOptions: AvatarOptions;
}

/** Minimal avatar appearance description (serialisable) */
export interface AvatarOptions {
  direction?: number;
  skinColor?: number;
  clothing?: Record<string, string>;
}

/** A connected user inside a room */
export interface RoomUser {
  userId: string;
  username: string;
  avatarOptions: AvatarOptions;
  x: number;
  y: number;
}

/** Summary of a public room (used in the public lobby listing) */
export interface RoomInfo {
  id: string;
  name: string;
  userCount: number;
  maxUsers: number;
  ownerIds: string[];
  editorIds: string[];
  type?: RoomType;
}

/** Summary of a private house (used in the private lobby section) */
export interface HouseInfo {
  id: number;
  name: string;
  type: 'PRIVATE';
  access: HouseAccess;
  ownerUsername: string | null;
  hasPassword: boolean;
  schemaId: number | null;
  schemaName: string | null;
  maxUsers: number;
  userCount?: number;
}

/** A house schema (admin-defined template) */
export interface HouseSchema {
  id: number;
  name: string;
  description: string | null;
}

/** Full room state sent to a client on join */
export interface RoomState {
  roomId: string;
  name: string;
  houseXml: string;
  furnitures: FurnitureState[];
  users: RoomUser[];
  /** Permission granted to the joining user */
  yourPermission: import('./permissions').RoomPermission;
}

/** Current state of a single furniture piece inside a room */
export interface FurnitureState {
  instanceId: string;
  baseId: number;
  x: number;
  y: number;
  orientation: number;
}

/** A single chat message */
export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  text: string;
  /** Unix timestamp (ms) */
  sentAt: number;
}
