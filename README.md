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
   No arquivo appsettings.json, ajust a DefaultConnection com as credenciais do seu banco de dados.
3. Aplique as migrations:
 - No Terminal execute "dotnet ef database update" ou no Gerenciador de Pacotes execute "Update-Database"
4. Execute a aplicação:
 - dotnet run
5. Acesse no navegador: https://localhost:7085

