/** Shared identity key for wedding RSVP names. */
export function normalizeRsvpName(name: string): string {
  return name.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR').trim().replace(/\s+/gu, ' ');
}
