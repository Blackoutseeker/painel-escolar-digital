from unittest import TestCase, main
from src.usuario import Usuario
from sys import exit


class TestUsuario(TestCase):
    def __init__(self, *args, **kwargs):
        self.__nome_usuario: str = 'John Doe'
        self.__email_usuario: str = 'johndoe@example.com'
        self.__senha_usuario: str = 'Senha hipoteticamente forte'
        super().__init__(*args, **kwargs)

    def test_name_exception(self):
        bad_name: str = '     '
        with self.assertRaises(ValueError) as context:
            Usuario(bad_name, self.__email_usuario, self.__senha_usuario)
        self.assertRaises(context.expected)

    def test_email_exception(self):
        bad_email: str = '     '
        with self.assertRaises(ValueError) as context:
            Usuario(bad_email, bad_email, self.__senha_usuario)
        self.assertRaises(context.expected)

    def test_password_exception(self):
        with self.assertRaises(Exception) as context:
            Usuario(self.__nome_usuario, self.__email_usuario, '1234')
        self.assertEqual(str(context.exception), 'A senha deve possuir mais de 8 caracteres alfanuméricos.')

    def test_create_successfully_instance(self):
        usuario = Usuario(self.__nome_usuario, self.__email_usuario, '1234wasd')
        self.assertIsInstance(usuario, Usuario)


if __name__ == '__main__':
    exit(main())
