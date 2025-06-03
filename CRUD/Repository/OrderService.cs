using CRUD.Data;
using CRUD.Models;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Repository
{

    //Serviço responsável pela manipulação de operações CRUD relecionadas à entidade Order
    public class OrderService : IOrderService
    {
        AppDbContext _context;   
        
        //Construtor da classe OrderService
        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        // Recupera todas as ordens cadastradas no banco de dados
        public IEnumerable<Order> GetOrders()
        {
            return _context.Orders.ToList();
        }

        // Adiciona uma nova ordem ao banco de dados
        public Order PostOrder(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChangesAsync();

            return order;
        }

        // Recupera uma ordem específica pelo seu ID
        public Order GetOrderById(int id)
        {
            return _context.Orders.FirstOrDefault(x => x.Id == id);
        }


        // Atualiza uma ordem existente no banco de dados
        public Order PutOrder(Order order)
        {
            _context.Orders.Update(order);
            _context.SaveChanges();

            return order;
        }
    }
}
