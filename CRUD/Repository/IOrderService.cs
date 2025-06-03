using CRUD.Models;

namespace CRUD.Repository
{

    // Interface que define os contratos para operações CRUD relacionadas à entidade Order
    public interface IOrderService
    {

        // Recupera todas as ordens cadastradas.
        public IEnumerable<Order> GetOrders();


        // Adiciona uma nova ordem.
        public Order PostOrder(Order order);


        // Recupera uma ordem pelo ID
        public Order GetOrderById(int id);


        // Atualiza uma ordem existente.
        public Order PutOrder(Order order);

    }
}
