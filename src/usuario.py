class Usuario:
    def __init__(self, nome: str, email: str, senha: str):
        if len(nome.strip()) <= 0 or not isinstance(nome, str):
            raise ValueError('O nome deve ser uma string não vazia.')

        if len(email.strip()) <= 0 or not isinstance(email, str):
            raise ValueError('O e-mail deve ser uma string não vazia.')

        if len(senha) < 8 or not isinstance(senha, str):
            raise Exception('A senha deve possuir mais de 8 caracteres alfanuméricos.')

        self.__nome = nome
        self.__email = email
        self.__senha = senha

    @property
    def nome(self):
        return self.__nome

    @property
    def email(self):
        return self.__email

    def login_por_nome(self, nome, senha):
        if nome == self.nome and senha == self.__senha:
            return True
        return False

    def exibir_informacoes(self):
        print('Informações do usuário:')
        print(f"Nome: {self.__nome}")
        print(f"Email: {self.__email}")
