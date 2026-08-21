'use client'

import type { FC, SubmitEvent, ChangeEvent } from 'react'
import { useState, createContext, useContext, ReactNode } from 'react'
import {
  Users,
  UserPlus,
  BookOpen,
  GraduationCap,
  Settings,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  Search,
  Mail,
  CreditCard,
  Key
} from 'lucide-react'

// 1. Tipagem
type UserRole = 'Aluno' | 'Responsável' | 'Professor' | 'Gestor'

interface User {
  id: string
  nome: string
  cpf: string
  email: string
  tipo: UserRole
  dataCriacao: string
}

interface UserContextData {
  users: User[]
  addUser: (user: Omit<User, 'id' | 'dataCriacao'>) => void
}

// 2. Criação do Contexto Global
const UserContext = createContext<UserContextData>({} as UserContextData)

// 3. Provider do Contexto (Engloba a aplicação para prover o estado)
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'usr-1a2b3c',
      nome: 'Carlos Eduardo Oliveira',
      cpf: '123.456.789-00',
      email: 'carlos.edu@escola.br',
      tipo: 'Professor',
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    }
  ])

  const addUser = (userData: Omit<User, 'id' | 'dataCriacao'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9), // ID simulado
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    }
    setUsers(prev => [newUser, ...prev])
  }

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Componente: Menu Lateral (Sidebar)
const Sidebar = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col bg-emerald-950 text-white transition-transform duration-300 ease-in-out lg:static ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-2">
              <Settings className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Educa<span className="text-emerald-400">Admin</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 p-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-emerald-100 transition-colors hover:bg-white/5"
          >
            <BookOpen className="h-5 w-5" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white shadow-lg shadow-emerald-900/20 transition-colors"
          >
            <Users className="h-5 w-5" /> Gestão de Usuários
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-emerald-100 transition-colors hover:bg-white/5"
          >
            <GraduationCap className="h-5 w-5" /> Turmas e Notas
          </a>
        </nav>
      </aside>
    </>
  )
}

// Componente: Modal de Detalhes do Usuário
const UserDetailsModal = ({
  user,
  onClose
}: {
  user: User | null
  onClose: () => void
}) => {
  if (!user) return null

  const roleColors = {
    Aluno: 'bg-blue-100 text-blue-800 border-blue-200',
    Responsável: 'bg-amber-100 text-amber-800 border-amber-200',
    Professor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    Gestor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="animate-in fade-in zoom-in relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <h3 className="text-lg font-bold text-slate-800">Ficha do Usuário</h3>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600">
              {user.nome.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">{user.nome}</h4>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${roleColors[user.tipo]} mt-1`}
              >
                {user.tipo}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4">
            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                E-mail
              </label>
              <div className="font-medium text-slate-800">{user.email}</div>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                CPF
              </label>
              <div className="font-medium text-slate-800">{user.cpf}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Data de Criação
                </label>
                <div className="font-medium text-slate-800">
                  {user.dataCriacao}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  ID Interno
                </label>
                <div className="font-mono text-sm font-medium text-slate-800">
                  {user.id}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente: Formulário de Cadastro (Aba 1)
const RegistrationForm: FC = () => {
  const { addUser } = useContext(UserContext)

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    tipo: '' as UserRole | '',
    senha: '',
    confirmarSenha: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem. Verifique a digitação.')
      return
    }

    // Adiciona o usuário usando o Contexto Global
    addUser({
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      tipo: formData.tipo as UserRole
    })

    setSuccess(true)
    setFormData({
      nome: '',
      cpf: '',
      email: '',
      tipo: '',
      senha: '',
      confirmarSenha: ''
    })

    setTimeout(() => setSuccess(false), 4000)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="animate-in fade-in rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">
            Usuário cadastrado com sucesso e adicionado à memória global!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Nome Completo
            </label>
            <div className="relative">
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Ex: João da Silva"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              CPF
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <CreditCard className="h-5 w-5 text-slate-400" />
              </div>
              <input
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              E-mail
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="email@escola.br"
              />
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Tipo de Perfil
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="" disabled>
                Selecione uma opção...
              </option>
              <option value="Aluno">Aluno</option>
              <option value="Responsável">Responsável</option>
              <option value="Professor">Professor</option>
              <option value="Gestor">Gestor / Admin</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Senha
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Key className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Confirmar Senha
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Key className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-6">
          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-emerald-700 active:scale-[0.98]"
          >
            <UserPlus className="h-5 w-5" /> Salvar Cadastro
          </button>
        </div>
      </form>
    </div>
  )
}

// Componente: Lista de Usuários (Aba 2)
const UserList = () => {
  const { users } = useContext(UserContext)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const roleColors = {
    Aluno: 'bg-blue-100 text-blue-800 border-blue-200',
    Responsável: 'bg-amber-100 text-amber-800 border-amber-200',
    Professor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    Gestor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }

  return (
    <>
      <div className="animate-in fade-in">
        {users.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
              <Search className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">
              Nenhum usuário encontrado
            </h3>
            <p className="mt-2 max-w-sm text-slate-500">
              Utilize a aba &quot;Cadastrar Usuário&quot; para começar a
              preencher a base de dados do sistema.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map(user => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
              >
                <div className="absolute top-0 right-0 -z-10 h-24 w-24 rounded-bl-full bg-linear-to-br from-emerald-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600">
                    {user.nome.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h4
                      className="truncate font-bold text-slate-900"
                      title={user.nome}
                    >
                      {user.nome}
                    </h4>
                    <span
                      className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${roleColors[user.tipo]} mt-1`}
                    >
                      {user.tipo}
                    </span>
                    <div className="mt-2 flex items-center gap-1.5 truncate text-xs text-slate-500">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  )
}

// Componente: Estrutura Principal da Página
const CadastrosPage = () => {
  const { users } = useContext(UserContext)
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'cadastro' | 'lista'>('cadastro')

  return (
    <div className="flex min-h-screen w-full bg-slate-50 font-sans text-slate-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Header Desktop e Mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="-ml-2 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-emerald-600 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Módulo de Cadastros
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold text-slate-600 sm:block">
              Secretaria Central
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 font-bold text-emerald-800">
              SC
            </div>
          </div>
        </header>

        {/* Área de Conteúdo */}
        <div className="mx-auto w-full max-w-7xl p-6 sm:p-8">
          {/* Tabs */}
          <div className="mb-8 flex flex-col gap-2 border-b border-slate-200 sm:flex-row sm:gap-6">
            <button
              onClick={() => setActiveTab('cadastro')}
              className={`relative cursor-pointer px-2 pb-4 text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === 'cadastro'
                  ? 'text-emerald-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Cadastrar Usuário
              {activeTab === 'cadastro' && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full bg-emerald-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('lista')}
              className={`relative flex cursor-pointer items-center gap-2 px-2 pb-4 text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === 'lista'
                  ? 'text-emerald-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Usuários Registrados
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeTab === 'lista'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {users.length}
              </span>
              {activeTab === 'lista' && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full bg-emerald-600"></div>
              )}
            </button>
          </div>

          {/* Renderização Condicional do Conteúdo da Tab */}
          {activeTab === 'cadastro' ? <RegistrationForm /> : <UserList />}
        </div>
      </main>
    </div>
  )
}

// Componente Root que envelopa tudo com o Provider
export default function App() {
  return (
    <UserProvider>
      <CadastrosPage />
    </UserProvider>
  )
}
