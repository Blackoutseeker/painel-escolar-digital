# models/professor.py
from .usuario import Usuario
from .disciplina import Disciplina

class Professor(Usuario):
    """Professor é um Usuario com funcionalidades específicas"""
    
    def __init__(self, nome: str, cpf: str, data_nascimento: datetime, 
                 email: str, login: str, senha: str, matricula: str):
        super().__init__(nome, cpf, data_nascimento, email, login, senha)
        self._matricula = matricula
        self._disciplinas = []  # Lista de objetos Disciplina
    
    def get_tipo(self) -> str:
        return "PROFESSOR"
    
    def adicionar_disciplina(self, disciplina: Disciplina):
        if disciplina not in self._disciplinas:
            self._disciplinas.append(disciplina)
    
    def lancar_nota(self, aluno, disciplina, valor: float):
        from .nota import Nota  # Import local para evitar circular
        nota = Nota(aluno, self, disciplina, valor)
        aluno.adicionar_nota(nota)
        return nota