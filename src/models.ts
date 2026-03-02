import { Point } from './common';

// ─── Shared domain models ─────────────────────────────────────────────────────

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

/** Summary of a room (used in lobby listings) */
export interface RoomInfo {
  id: string;
  name: string;
  userCount: number;
  maxUsers: number;
  ownerIds: string[];
  editorIds: string[];
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
