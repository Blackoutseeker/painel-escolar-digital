from datetime import datetime
from pessoa import Pessoa
from disciplina import Disciplina


class Professor(Pessoa):
    """Professor é um Usuario com funcionalidades específicas"""

    def __init__(self, nome: str, cpf: str, data_nascimento: datetime, matricula: str):
        super().__init__(nome, cpf, data_nascimento)
        self.__matricula = matricula
        self.__disciplinas = []  # Lista de objetos Disciplina

    def get_tipo(self) -> str:
        return "PROFESSOR"

    def adicionar_disciplina(self, disciplina: Disciplina):
        if disciplina not in self.__disciplinas:
            self.__disciplinas.append(disciplina)

    @staticmethod
    def lancar_nota(aluno, disciplina, valor: float):
        from nota import Nota  # Import local para evitar circular
        nota = Nota(aluno, disciplina, valor)
        aluno.adicionar_nota(nota)
        return nota
