class Turma:
    def __init__(self, nome, ano_letivo):
        self.nome = nome
        self.ano_letivo = ano_letivo
        self.alunos = []  # Lista para armazenar objetos Usuario (alunos)
        self.disciplinas = []  # Lista para armazenar objetos Disciplina

    def adicionar_aluno(self, aluno):
        """Adiciona um aluno à lista da turma."""
        if aluno not in self.alunos:
            self.alunos.append(aluno)

    def remover_aluno(self, aluno):
        """Remove um aluno da turma, se existir."""
        if aluno in self.alunos:
            self.alunos.remove(aluno)

    def adicionar_disciplina(self, disciplina):
        """Adiciona uma disciplina à grade curricular da turma."""
        self.disciplinas.append(disciplina)

    def listar_alunos(self):
        """Retorna a lista de alunos matriculados."""
        return self.alunos

    def __str__(self):
        return f"Turma: {self.nome} ({self.ano_letivo}) - {len(self.alunos)} alunos"
