from datetime import date

class Nota:
    def __init__(self, aluno, disciplina, valor, data = date):
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


nota1 = Nota("Gabriel", "Matemática", 8.5, date(2025, 11, 27))
print(nota1)