'use client'

import type { FC, SubmitEventHandler } from 'react'
import { useState } from 'react'
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'error' | 'success'
    text: string
  } | null>(null)

  const handleLogin: SubmitEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setIsLoading(true)
    setMessage(null)

    // Simulação de chamada de API
    setTimeout(() => {
      if (email && password) {
        setMessage({
          type: 'success',
          text: 'Login realizado com sucesso! Redirecionando...'
        })
      } else {
        setMessage({
          type: 'error',
          text: 'Por favor, preencha todos os campos corretamente.'
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="relative flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
      <div className="absolute top-6 left-6 flex items-center gap-2 text-indigo-900 lg:hidden">
        <BookOpen className="h-6 w-6 text-indigo-600" />
        <span className="text-xl font-bold">
          Educa<span className="text-indigo-600">Painel</span>
        </span>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Portal do Responsável
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Faça login com seu E-mail cadastrado na secretaria.
          </p>
        </div>

        {message && (
          <div
            className={`rounded-lg p-4 text-sm font-medium ${
              message.type === 'success'
                ? 'border border-green-200 bg-green-50 text-green-800'
                : 'border border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-2.5 pr-3 pl-10 transition-colors focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                placeholder="exemplo@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-10 transition-colors focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block cursor-pointer text-sm text-gray-700"
              >
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
              >
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Acessando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Entrar no Portal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">
                Primeiro acesso?
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Se você ainda não possui acesso, entre em contato com a
              <a
                href="/admin"
                className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500"
              >
                secretaria da escola
              </a>{' '}
              para solicitar seu cadastro.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
