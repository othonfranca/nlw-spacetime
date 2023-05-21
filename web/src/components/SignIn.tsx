import { User } from 'lucide-react'

export function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 text-left "
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 transition-colors hover:bg-gray-300">
        <User className="h-5 w-5 text-gray-500" />
      </div>
      <p className="leading-snung max-w-[140px] text-sm transition-colors hover:text-gray-50">
        <span className="underline">Crie sua conta e salve suas memórias!</span>
      </p>
    </a>
  )
}