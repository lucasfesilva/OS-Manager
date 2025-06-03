# CRUD - Sistema de Gestão de Ordens de Serviço
Este projeto é um sistema de gestão de ordens de serviço desenvolvido em ASP.NET Core para o backend, utilizando o Entity Framework Core como ORM e um frontend em HTML, Boostrap e JavaScript para a interface de usuário.

# Tecnologias Utilizadas
Backend:
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Identity para autenticação

Frontend:
- HTML5
- Boostrap 5
- JavaScript

# Funcionalidades
- Cadastro de novos usuários
- Autenticação via Identity
- CRUD completo para Ordens de Serviço

# Como executar o Projeto
Pré-requisitos:
 - .NET 8.0
 - SQL Server
 - Visual Studio 2022
1. Clone o repositório
 
2. Configure a string de conexão
 - No arquivo appsettings.json, ajuste a DefaultConnection com as credenciais do seu banco de dados.
   
3. Aplique as migrations:
 - No Terminal execute "dotnet ef database update" ou no Gerenciador de Pacotes execute "Update-Database"
   
4. Execute a aplicação:
 - dotnet run

5. Acesse no navegador: https://localhost:7085
6. Na tela de Login, clique em "Cadastrar" para criar seu primeiro usuário
   - Informe o E-mail
   - Informe a senha. A senha deve conter no mínimo 8 caracteres, ao menos 1 letra maiúscula, 1 número e 1 caractere especial.
   - Confirme a senha.
   - Clique em Cadastrar
7. Faça o Login utilizando o E-mail e Senha criados na tela de Cadastro
8. Uma vez autenticado, você será direcionado à home page da aplicação

# Observações Técnicas
O projeto adota o Repository Pattern para desacoplar a lógica de acesso a dados da lógica de negócios.
Vantagens:
- Permite uma abstração clara entre o Controller e a camada de Persistência
- Utiliza a injeção de dependência, tornando o código mais flexível

Interfaces:
IOrderService define os contratos que são implementados por OrderService.

Implementação:
OrderService encapsula as operações de persistência, utilizando o AppDbContext para interagir com o banco de dados.

Controller:
O OrderController injeta a interface IOrderService e não depende diretamente do DbContext, promovendo baixo acoplamento.


