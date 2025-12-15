# CLASSE PESSOA.py
from abc import ABC, abstractmethod
from datetime import datetime


class Pessoa(ABC):
    """Classe ABSTRATA que define atributos comuns a todas as pessoas"""
    
    def __init__(self, nome: str, cpf: str, data_nascimento: datetime, email: str):
        self._nome = nome
        self._cpf = cpf
        self._data_nascimento = data_nascimento
        self._email = email
        self._telefone = None
    
    # Método abstrato - cada subclasse implementa
    @abstractmethod
    def get_tipo(self) -> str:
        pass
    
    # Propriedades (encapsulamento)
    @property
    def nome(self):
        return self._nome
    
    @property
    def idade(self) -> int:
        hoje = datetime.now()
        return hoje.year - self._data_nascimento.year
    
    def __str__(self):
        return f"{self.get_tipo()}: {self._nome}"
