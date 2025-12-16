from abc import ABC, abstractmethod
from datetime import date

# Classe base (para herança + polimorfismo)
class Avaliacao(ABC):
    def __init__(self, disciplina: str, data: date):
        self._disciplina = disciplina
        self._data = data

    @abstractmethod
    def calcular_resultado(self):
        pass


# Classe Nota
class Nota(Avaliacao):
    def __init__(self, aluno: str, disciplina: str, valor: float, data: date):
        super().__init__(disciplina, data)  # herança
        self._aluno = aluno
        self.valor = valor  # usa setter (encapsulamento)

    # Encapsulamento
    @property
    def valor(self):
        return self._valor

    @valor.setter
    def valor(self, valor):
        if 0 <= valor <= 10:
            self._valor = valor
        else:
            raise ValueError("A nota deve estar entre 0 e 10")

    # Polimorfismo
    def calcular_resultado(self):
        return "Aprovado" if self._valor >= 6 else "Reprovado"