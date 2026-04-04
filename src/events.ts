import { Point } from './common';
import { FurnitureState, RoomState, ChatMessage } from './models';
import { RoomPermission } from './permissions';

// ─── STOMP destinations ───────────────────────────────────────────────────────

/**
 * All STOMP destinations as a const object.
 *
 * Client → Server destinations use the application prefix `/app`.
 * Server → Client destinations:
 *   - Room broadcasts: `/topic/room/{roomId}/<event>`  (use roomTopic())
 *   - Private/user:   `/user/queue/<event>`
 */
export const StompDest = {
  // ── Client → Server (/app prefix) ─────────────────────────────────────────
  JOIN_ROOM:         '/app/join',
  LEAVE_ROOM:        '/app/leave',
  AVATAR_MOVE:       '/app/avatar/move',
  AVATAR_SAY:        '/app/avatar/say',
  CLOTHING_REFRESH:  '/app/avatar/clothing/refresh',
  FURNITURE_MOVE:    '/app/furniture/move',
  FURNITURE_PLACE:   '/app/furniture/place',
  FURNITURE_REMOVE:  '/app/furniture/remove',
  FURNITURE_ROTATE:  '/app/furniture/rotate',
  CHAT_MESSAGE:      '/app/chat',

  // ── Server → Client: per-room topic suffix (use roomTopic()) ───────────────
  TOPIC_JOINED:           'joined',
  TOPIC_LEFT:             'left',
  TOPIC_AVATAR_MOVE:      'avatar-move',
  TOPIC_AVATAR_SAY:       'avatar-say',
  TOPIC_FURNITURE_MOVE:   'furniture-move',
  TOPIC_FURNITURE_PLACE:  'furniture-place',
  TOPIC_FURNITURE_REMOVE: 'furniture-remove',
  TOPIC_FURNITURE_ROTATE: 'furniture-rotate',
  TOPIC_CHAT:             'chat',
  TOPIC_AVATAR_APPEARANCE: 'avatar-appearance',

  // ── Server → Client: private user queue ────────────────────────────────────
  QUEUE_STATE:  '/user/queue/state',
  QUEUE_ERROR:  '/user/queue/error',
  QUEUE_KICKED: '/user/queue/kicked',
} as const;

export type StompDestName = typeof StompDest[keyof typeof StompDest];

/** Build the full topic path for a room-scoped broadcast. */
export function roomTopic(roomId: string, event: string): string {
  return `/topic/room/${roomId}/${event}`;
}

// Backward-compat alias (transitional — remove once all packages migrated)
/** @deprecated Use StompDest */
export const SocketEvent = StompDest;
export type SocketEventName = StompDestName;

// ─── Client → Server payloads ─────────────────────────────────────────────────

export interface JoinRoomPayload {
  roomId: string;
  direction: number;
}

export interface AvatarMovePayload {
  x: number;
  y: number;
  direction: number;
}

export interface AvatarSayPayload {
  text: string;
}

export interface FurnitureMovePayload {
  instanceId: string;
  x: number;
  y: number;
}

export interface FurniturePlacePayload {
  baseId: number;
  x: number;
  y: number;
  orientation: number;
}

export interface FurnitureRemovePayload {
  instanceId: string;
}

export interface FurnitureRotatePayload {
  instanceId: string;
  orientation: number;
}

export interface ChatMessagePayload {
  text: string;
}

// ─── Server → Client payloads ─────────────────────────────────────────────────

export interface RoomErrorPayload {
  code: 'NOT_FOUND' | 'FORBIDDEN' | 'FULL' | 'INVALID_TOKEN' | 'INTERNAL';
  message: string;
}

export interface UserJoinedPayload {
  userId: string;
  username: string;
  skinColor: number;
  clothing: Record<string, string>;
  x: number;
  y: number;
  direction: number;
  gender: string | null;
  rank: number;
  toonizLevel: number;
}

export interface UserLeftPayload {
  userId: string;
}

export interface RemoteAvatarMovePayload {
  userId: string;
  x: number;
  y: number;
  direction: number;
}

export interface RemoteAvatarSayPayload {
  userId: string;
  text: string;
}

export interface RemoteFurnitureMovePayload {
  instanceId: string;
  x: number;
  y: number;
}

export interface RemoteFurniturePlacePayload extends FurnitureState {
  placedByUserId: string;
}

export interface RemoteFurnitureRemovePayload {
  instanceId: string;
}

export interface RemoteFurnitureRotatePayload {
  instanceId: string;
  orientation: number;
}

export interface RemoteChatMessagePayload extends ChatMessage {}

export interface AvatarAppearancePayload {
  userId: string;
  skinColor: number;
  clothing: Record<string, string>;
}
