// ─── Room permissions ─────────────────────────────────────────────────────────

export enum RoomPermission {
  /** Can only observe the room */
  VIEW = 0,
  /** Can move / place / remove furniture */
  EDIT = 1,
  /** Full control: can also change house XML and manage users */
  OWN = 2,
}
