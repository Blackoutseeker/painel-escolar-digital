from src.aluno import Aluno
from src.disciplina import Disciplina
from src.professor import Professor
from src.turma import Turma
from src.usuario import Usuario
from datetime import datetime
from random import randint


class CLI:
    def __init__(self):
        self.__option = None
        self.__disciplinas: [Disciplina] = []
        self.__professores: [Professor] = []
        self.__alunos: [Aluno] = []
        self.__turmas: [Turma] = []
        self.__usuarios: [Usuario] = []

    @staticmethod
    def __handle_option(option, length) -> bool:
        if 0 < option <= length:
            return True
        print('Informe uma opção válida. Tente novamente.')
        return False

    def main_menu(self):
        while True:
            print('1) Cadastrar disciplina')
            print('2) Visualizar disciplinas')
            print('3) Cadastrar professor')
            print('4) Visualizar professores')
            print('5) Cadastrar aluno')
            print('6) Visualizar alunos')
            print('7) Cadastrar turma')
            print('8) Visualizar turmas')
            print('9) Entrar com usuário de professor')
            option = input('Informe sua opção (digite "sair" para parar): ')
            if option.lower() == 'sair':
                break
            option = int(option)
            self.__option = self.__handle_option(option, 9)
            if self.__option:
                if option == 1:
                    self.__cadastrar_disciplina()
                elif option == 2:
                    self.__visualizar_disciplinas()
                elif option == 3:
                    self.__cadastrar_professor()
                elif option == 4:
                    self.__visualizar_professores()
                elif option == 5:
                    self.__cadastrar_aluno()
                elif option == 6:
                    self.__visualizar_alunos()
                elif option == 7:
                    self.__cadastrar_turma()
                elif option == 8:
                    self.__visualizar_turmas()
                elif option == 9:
                    self.__login()

    def __cadastrar_disciplina(self):
        nome = input('Informe o nome do disciplina: ')
        codigo = input('Informe o código da disciplina: ')
        disciplina = Disciplina(nome, codigo)
        self.__disciplinas.append(disciplina)

    def __visualizar_disciplinas(self):
        for disciplina in self.__disciplinas:
            print(f'{disciplina.nome} - {disciplina.codigo}')

    def __cadastrar_professor(self):
        nome = input('Informe o nome do professor: ')
        cpf = input('Informe o CPF do professor: ')
        data_nascimento = input('Informe a data de nascimento (dd/mm/YYYY): ')
        data_nascimento = datetime.strptime(data_nascimento, '%d/%m/%Y')
        matricula = input('Informe o matrícula do professor: ')
        nome_disciplina = input('Informe o nome da disciplina que o professor leciona: ')
        codigo = input('Informe o código da disciplina que o professor leciona: ')
        professor = Professor(nome, cpf, data_nascimento, matricula)
        disciplina = Disciplina(nome_disciplina, codigo)
        professor.adicionar_disciplina(disciplina)
        self.__professores.append(professor)

        email = input('Informe o e-mail de usuário do professor: ')
        senha = input('Informe a senha de usuário do professor: ')
        usuario = Usuario(nome, email, senha)
        self.__usuarios.append(usuario)

    def __visualizar_professores(self):
        if len(self.__professores) == 0:
            print('Nenhum professor cadastrado.')
            return
        for professor in self.__professores:
            for disciplina in professor.disciplinas:
                print(f'{professor.nome} - {disciplina.nome}')

    def __cadastrar_aluno(self):
        nome = input('Informe o nome do aluno: ')
        cpf = input('Informe o CPF do aluno: ')
        data_nascimento = input('Informe a data de nascimento (dd/mm/YYYY): ')
        data_nascimento = datetime.strptime(data_nascimento, '%d/%m/%Y')
        matricula = input('Informe a matrícula do aluno: ')
        id_turma = input('Informe o ID da turma: ')
        aluno = Aluno(nome, cpf, data_nascimento, matricula, id_turma)
        self.__alunos.append(aluno)
        for turma in self.__turmas:
            if len(turma.alunos) < 30:
                turma.adicionar_aluno(aluno)

    def __visualizar_alunos(self):
        if len(self.__alunos) == 0:
            print('Nenhum aluno cadastrado.')
            return
        for aluno in self.__alunos:
            print(f'{aluno.nome}')

    def __cadastrar_turma(self):
        nome = input('Informe o nome da turma: ')
        ano_letivo = input('Informe o ano letivo: ')
        turma = Turma(nome, ano_letivo)
        self.__turmas.append(turma)

    def __visualizar_turmas(self):
        if len(self.__turmas) == 0:
            print('Nenhuma turma cadastrada.')
            return
        for turma in self.__turmas:
            print(f'{turma.nome} - {turma.ano_letivo}')
            print(f'{turma.alunos}')

    def __login(self):
        nome = input('Informe o nome do usuário: ')
        senha = input('Informe a senha de usuário: ')
        professor = None
        for professor in self.__professores:
            if professor.nome == nome:
                professor = professor
        for usuario in self.__usuarios:
            if usuario.nome == nome:
                if not usuario.login_por_nome(nome, senha):
                    print('Senha incorreta. Tente novamente.')
                    return
                self.__menu_professor(professor)

    def __menu_professor(self, professor: Professor):
        while True:
            print('1) Cadastrar disciplina')
            print('2) Lançar nota')
            option = input('Informe sua opção (digite "sair" para parar): ')
            if option.lower() == 'sair':
                break
            option = int(option)
            self.__option = self.__handle_option(option, 2)
            if self.__option:
                if option == 1:
                    nome = input('Informe o nome da disciplina: ')
                    codigo = input('Informe o código da disciplina: ')
                    discplina = Disciplina(nome, codigo)
                    professor.adicionar_disciplina(discplina)
                elif option == 2:
                    valor = input('Informe o valor da nota: ')
                    aluno = self.__alunos[randint(0, len(self.__alunos) - 1)]
                    disciplina = self.__disciplinas[randint(0, len(self.__disciplinas) - 1)]
                    professor.lancar_nota(aluno, disciplina, float(valor))
