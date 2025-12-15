from pessoa import Pessoa


class Aluno(Pessoa):
    def __init__(self, nome, cpf, data_nascimento, matricula, id_turma):
        super().__init__(nome, cpf, data_nascimento)
        self.__matricula = matricula
        self.__id_turma = id_turma
        self.__notas = []
        self.__frequencias = []

    def get_tipo(self):
        return 'ALUNO'
