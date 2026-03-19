// ─── Shared domain models ─────────────────────────────────────────────────────

export type RoomType = 'PUBLIC' | 'PRIVATE';
export type HouseAccess = 'OPEN' | 'PASSWORD' | 'CLOSED';

/** Authenticated user info (returned by the server after token validation) */
export interface UserInfo {
  id: string;
  username: string;
  /** MALE | FEMALE | NON_BINARY | null */
  gender: string | null;
  /** 0 = user, 1 = moderator, 2 = admin */
  rank: number;
  /** 0 = none, 1/2/3 */
  toonizLevel: number;
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
  /** MALE | FEMALE | NON_BINARY | null */
  gender: string | null;
  /** 0 = user, 1 = moderator, 2 = admin */
  rank: number;
  /** 0 = none, 1/2/3 */
  toonizLevel: number;
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

// ─── House layout (JSON format) ───────────────────────────────────────────────

export interface HousePointDef {
  /** YPOS equivalent (pre-rotation raw X) */
  x: number;
  /** XPOS equivalent (pre-rotation raw Y) */
  y: number;
}

export interface HouseFloorDef {
  /** Ordered indices into the points array */
  points: number[];
}

export interface HouseDoorDef {
  /** Distance along the wall from point A to door center */
  offset: number;
}

export interface HouseWallDef {
  ptA: number;
  ptB: number;
  h: number;
  /** True if this wall segment has an entry door */
  enter?: boolean;
  door?: HouseDoorDef;
  /** True to render the wall invisible (collision only) */
  hidden?: boolean;
}

export interface HouseLayout {
  points: HousePointDef[];
  walls: HouseWallDef[];
  floors: HouseFloorDef[];
}

/** Full room state sent to a client on join */
export interface RoomState {
  roomId: string;
  name: string;
  houseData: string;
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
  /** 0 = user, 1 = moderator, 2 = admin */
  rank: number;
  text: string;
  /** Unix timestamp (ms) */
  sentAt: number;
}
