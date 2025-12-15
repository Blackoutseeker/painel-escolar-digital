from datetime import date


class Nota:
    def __init__(self, aluno, disciplina, valor, data=date.today()):
        self.aluno = aluno
        self.disciplina = disciplina
        self.valor = valor
        self.data = data

    def __str__(self):
        return (
            f"Aluno: {self.aluno}\n"
            f"Disciplina: {self.disciplina}\n"
            f"Nota: {self.valor}\n"
            f"Data: {self.data.strftime('%d/%m/%Y')}"
        )
