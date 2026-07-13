import type { NextPage } from 'next'
import InstitutionalPanel from '@/components/InstitutionalPanel'

const Login: NextPage = () => {
  return (
    <main className="flex min-h-screen w-full bg-gray-50 font-sans text-gray-900">
      <InstitutionalPanel />
    </main>
  )
}

export default Login
