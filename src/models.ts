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
  /** Monnaie payante (achat) — défaut 0 */
  kreds: number;
  /** Monnaie gratuite (jeu) — défaut 1500 */
  pez: number;
  /** Avatar appearance options at the time of spawn */
  avatarOptions: AvatarOptions;
  /** Raw JSON string of avatar options stored in DB (undefined on old sessions) */
  avatarOptionsJson?: string;
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

// ─── Items & Boutiques ────────────────────────────────────────────────────────

export type ItemType = 'FURNITURE' | 'CLOTHING' | 'MISC';
export type ItemSubType =
  | 'FLOOR' | 'WALL' | 'WALLPAPER' | 'PIECE'
  | 'HAIRSTYLE' | 'HAT' | 'TOP' | 'BOTTOM' | 'MAKEUP' | 'OTHER';
export type ShopIdType = 'COUPE_TIFF' | 'IKEBO' | 'VESTIS';
export type BuyOption = 'PEZ' | 'KREDS';

export interface ItemInfo {
  id: number;
  name: string;
  itemType: ItemType;
  subType: ItemSubType;
  possessable: boolean;
  displayImage: string | null;
  spritePath: string | null;
  spriteKey: string | null;
}

export interface UserItemInfo {
  id: number | null;
  item: ItemInfo;
  equipped: boolean;
  placedInRoomId: string | null;
  acquiredAt: string | null;
}

export interface ShopItemInfo {
  id: number;
  item: ItemInfo;
  pezPrice: number | null;
  kredBonus: number;
  kredPrice: number | null;
  collectionId: number | null;
  /** Stock restant (null = illimité, 0 = épuisé). */
  stock: number | null;
}

export interface CollectionInfo {
  id: number;
  shopId: string;
  name: string;
  bannerImage: string | null;
  sortOrder: number;
  enabled: boolean;
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
