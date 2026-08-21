'use client'

import type { FC, SubmitEvent } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Settings, Mail, Lock, Eye, EyeOff, Loader2, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AdminLoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  // Estado para gerenciar mensagens de feedback (erro ou sucesso)
  const [feedback, setFeedback] = useState<{
    type: 'error' | 'success'
    message: string
  } | null>(null)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFeedback(null)

    // Simulação de chamada de autenticação
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (email.trim() && password.trim()) {
        setFeedback({
          type: 'success',
          message: 'Autenticado com sucesso! Redirecionando para Cadastros...'
        })

        router.push('/cadastros')
      } else {
        setFeedback({
          type: 'error',
          message: 'Preencha suas credenciais de administrador corretamente.'
        })
      }
    } catch (_) {
      setFeedback({
        type: 'error',
        message: 'Ocorreu um erro no servidor. Tente novamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Alerta de Feedback */}
      {feedback && (
        <div
          className={`flex items-start gap-3 rounded-lg p-4 text-sm font-medium transition-all duration-300 ${
            feedback.type === 'success'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border border-rose-200 bg-rose-50 text-rose-800'
          }`}
          role="alert"
        >
          {feedback.message}
        </div>
      )}

      {/* Input de E-mail/Matrícula */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700"
        >
          E-mail Institucional
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Mail className="h-5 w-5" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 text-sm text-slate-900 transition-all outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
            placeholder="admin@escola.edu.br"
          />
        </div>
      </div>

      {/* Input de Senha */}
      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-slate-700"
        >
          Senha Administrativa
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Lock className="h-5 w-5" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoading}
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-12 pl-11 text-sm text-slate-900 transition-all outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3.5 text-slate-400 transition-colors hover:text-slate-600 focus:text-emerald-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 transition-colors focus:ring-emerald-600"
          />
          <label
            htmlFor="remember-me"
            className="block cursor-pointer text-sm font-medium text-slate-600 select-none"
          >
            Lembrar acesso
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Autenticando...
          </>
        ) : (
          <>
            Acessar Painel Admin
            <LogIn className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}

const App: FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 font-sans">
      {/* Lado Esquerdo - Área Visual e Institucional */}
      <div className="relative hidden flex-col overflow-hidden bg-emerald-900 lg:flex lg:w-[45%]">
        {/* Fundo com imagem/gradiente */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
            alt="Mesa de administração escolar"
            fill
            sizes="45vw"
            priority
            className="h-full w-full object-cover opacity-15 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-950 opacity-95"></div>
        </div>

        {/* Conteúdo Institucional */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-12">
          <div className="flex items-center gap-3 text-white">
            <div className="rounded-xl bg-white/10 p-2 backdrop-blur-sm">
              <Settings className="h-8 w-8 text-emerald-300" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Educa<span className="text-emerald-300">Admin</span>
            </span>
          </div>

          <div className="mt-12 mb-12 max-w-lg space-y-6">
            <h1 className="text-4xl leading-tight font-extrabold text-white lg:text-5xl">
              Gestão escolar inteligente.
            </h1>
            <p className="text-lg leading-relaxed text-emerald-100">
              Controle total sobre matrículas, dados de alunos, professores e
              grade curricular em um único ambiente seguro.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2">
              <div className="flex items-center gap-3 text-emerald-50">
                <div className="rounded-full bg-emerald-800/60 p-2.5">
                  <svg
                    className="h-5 w-5 text-emerald-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">Gestão de Usuários</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-50">
                <div className="rounded-full bg-emerald-800/60 p-2.5">
                  <svg
                    className="h-5 w-5 text-emerald-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">
                  Controle de Matrículas
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm font-medium text-emerald-300/60">
            © {new Date().getFullYear()} EducaAdmin.
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center bg-slate-50 p-6 sm:p-12 lg:p-16">
        {/* Header Mobile */}
        <div className="mb-8 flex w-full max-w-md items-center gap-2 self-start text-slate-800 lg:hidden">
          <Settings className="h-7 w-7 text-emerald-600" />
          <span className="text-2xl font-bold">
            Educa<span className="text-emerald-600">Admin</span>
          </span>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
          <div className="mb-8">
            <span className="mb-4 inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-bold tracking-wider text-rose-700 uppercase">
              Área Restrita
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Acesso da Secretaria
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Insira suas credenciais corporativas para acessar o sistema.
            </p>
          </div>

          {/* Renderiza o componente isolado criado acima */}
          <AdminLoginForm />

          <div className="relative mt-8">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm leading-6 font-medium">
              <span className="bg-white px-4 text-slate-400">
                Segurança de Dados
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              O acesso é auditado e monitorado. Dúvidas? Fale com o{' '}
              <a
                href="#"
                className="font-semibold text-emerald-600 transition-colors hover:text-emerald-500"
              >
                administrador de TI
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
