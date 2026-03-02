import { Point } from './common';
import { AvatarOptions, FurnitureState, RoomState, ChatMessage } from './models';
import { RoomPermission } from './permissions';

// ─── Socket event names ───────────────────────────────────────────────────────

/** All Socket.IO event names as a const enum for type-safe emit/on calls */
export const SocketEvent = {
  // ── Client → Server ────────────────────────────────────────────────────────
  JOIN_ROOM:         'join_room',
  LEAVE_ROOM:        'leave_room',
  AVATAR_MOVE:       'avatar_move',
  AVATAR_SAY:        'avatar_say',
  FURNITURE_MOVE:    'furniture_move',
  FURNITURE_PLACE:   'furniture_place',
  FURNITURE_REMOVE:  'furniture_remove',
  FURNITURE_ROTATE:  'furniture_rotate',
  CHAT_MESSAGE:      'chat_message',

  // ── Server → Client ────────────────────────────────────────────────────────
  ROOM_STATE:              'room_state',
  ROOM_ERROR:              'room_error',
  USER_JOINED:             'user_joined',
  USER_LEFT:               'user_left',
  REMOTE_AVATAR_MOVE:      'remote_avatar_move',
  REMOTE_AVATAR_SAY:       'remote_avatar_say',
  REMOTE_FURNITURE_MOVE:   'remote_furniture_move',
  REMOTE_FURNITURE_PLACE:  'remote_furniture_place',
  REMOTE_FURNITURE_REMOVE: 'remote_furniture_remove',
  REMOTE_FURNITURE_ROTATE: 'remote_furniture_rotate',
  REMOTE_CHAT_MESSAGE:     'remote_chat_message',
} as const;

export type SocketEventName = typeof SocketEvent[keyof typeof SocketEvent];

// ─── Client → Server payloads ─────────────────────────────────────────────────

export interface JoinRoomPayload {
  roomId: string;
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
  avatarOptions: AvatarOptions;
  x: number;
  y: number;
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
