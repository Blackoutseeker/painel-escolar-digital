import type { FC } from 'react'
import Image from 'next/image'
import { BookOpen, ShieldCheck, Bell } from 'lucide-react'

const InstitutionalPanel: FC = () => {
  return (
    <div className="relative hidden overflow-hidden bg-indigo-900 lg:flex lg:w-1/2">
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover opacity-20 mix-blend-overlay"
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000"
          alt="Crianças estudando"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-indigo-800 to-blue-900 opacity-90"></div>
      </div>

      <div className="relative z-10 flex w-full flex-col justify-between p-12">
        <div className="flex items-center gap-2 text-white">
          <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-indigo-300" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Educa<span className="text-indigo-300">Painel</span>
          </span>
        </div>

        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl leading-tight font-extrabold text-white lg:text-5xl">
            Acompanhe de perto o futuro do seu filho.
          </h1>
          <p className="text-lg text-indigo-200">
            Acesse notas, frequências, comunicados e a agenda escolar em tempo
            real. A ponte perfeita entre a escola e a sua casa.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="flex items-center gap-3 text-indigo-100">
              <div className="rounded-full bg-indigo-800/50 p-2">
                <ShieldCheck className="h-5 w-5 text-indigo-300" />
              </div>
              <span className="text-sm font-medium">Acesso Seguro</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-100">
              <div className="rounded-full bg-indigo-800/50 p-2">
                <Bell className="h-5 w-5 text-indigo-300" />
              </div>
              <span className="text-sm font-medium">
                Notificações em Tempo Real
              </span>
            </div>
          </div>
        </div>

        <div className="text-sm text-indigo-300/60">
          © {new Date().getFullYear()} EducaPainel. Todos os direitos
          reservados.
        </div>
      </div>
    </div>
  )
}

export default InstitutionalPanel
