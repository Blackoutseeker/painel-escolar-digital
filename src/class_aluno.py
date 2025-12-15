from pessoa import Pessoa

class Aluno(Pessoa):
    def __init__(self, nome, idade, matricula, id_turma):
        super().__init__(nome, idade)
        self.matricula = matricula
        self.id_turma = id_turma
        self.notas = []
        self.frequencias = []
