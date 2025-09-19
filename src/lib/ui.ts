export function cx(...s: (string | false | null | undefined)[]) {
  return s.filter(Boolean).join(' ');
}