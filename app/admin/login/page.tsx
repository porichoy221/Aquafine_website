import { loginAction } from "../actions";
export default function Login({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="mx-auto max-w-sm px-4 py-20"><form action={loginAction} className="grid gap-3 rounded-2xl border bg-white p-6">
      <h1 className="text-xl font-extrabold">Admin login</h1><input type="password" name="password" placeholder="Password" className="inp" required />
      {searchParams.error && <p className="text-sm text-red-600">Wrong password.</p>}<button className="btn">Log in</button></form></main>);
}
