class disciplina:

    def __init__(self,nome,codigo):
    self.nome = nome
    self.codigo = codigo
    # dicionario:aluno -> lista de notas
    self.notas = {} 
    
    def adicionar_notas(self, aluno, nota):
        if aluno not in self.notas:
            self.notas[aluno] = []
        self.notas[aluno].append (nota)
        
    def media_aluno(self, aluno):
        if aluno in self.notas:
            return sum(self.notas[aluno]) / len(self.notas[aluno])
        return None
