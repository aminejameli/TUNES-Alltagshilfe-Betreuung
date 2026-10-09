/** Renders an email as one string that may only wrap after the "@" on narrow screens. */
export function EmailAddress({ email }: { email: string }) {
  const at = email.indexOf("@");
  if (at === -1) return <>{email}</>;
  return (
    <>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </>
  );
}
