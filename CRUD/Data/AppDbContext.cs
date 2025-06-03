using CRUD.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Data
{
    // Representa o contexto de banco de dados da aplicação, estendendo IdentityDbContext para suporte à autenticação e autorização
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {

        // Construtor que recebe as opções de configuração do context
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Conjunto de dados que representa as ordens armazenadas no banco de dados.
        public DbSet<Order> Orders { get; set; }


    }
}
