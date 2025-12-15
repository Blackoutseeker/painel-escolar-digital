# CLASSE PESSOA.py
from abc import ABC, abstractmethod
from datetime import datetime


class Pessoa(ABC):
    """Classe ABSTRATA que define atributos comuns a todas as pessoas"""
    
    def __init__(self, nome: str, cpf: str, data_nascimento: datetime):
        self.__nome = nome
        self.__cpf = cpf
        self.__data_nascimento = data_nascimento
        self.__telefone = None
    
    # Método abstrato - cada subclasse implementa
    @abstractmethod
    def get_tipo(self) -> str:
        pass
    
    # Propriedades (encapsulamento)
    @property
    def nome(self):
        return self.__nome
    
    @property
    def idade(self) -> int:
        hoje = datetime.now()
        return hoje.year - self.__data_nascimento.year

    @property
    def telefone(self):
        return self.__telefone
    
    def __str__(self):
        return f"{self.get_tipo()}: {self.__nome}"
