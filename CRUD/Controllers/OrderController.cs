using CRUD.Models;
using CRUD.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers
{

    // Controlador responsável por gerenciar as operações de CRUD relacionadas às ordens
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderService _orderService;

        // Construtor do OrderController
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // Recupera todas as ordens cadastradas
        [HttpGet]
        public IEnumerable<Order> GetOrders()
        {
            return _orderService.GetOrders();
        }


        // Cria uma nova ordem
        [HttpPost]
        public Order PostOrder(Order order)
        {
            return _orderService.PostOrder(order);
        }


        // Recupera uma ordem específica pelo ID
        [HttpGet("{id}")]
        public Order GetOrderById(int id)
        {
            return _orderService.GetOrderById(id);
        }


        // Atualiza uma ordem existente
        [HttpPut("{id}")]
        public Order PutOrder(int id, [FromBody] Order order)
        {
            var data = _orderService.GetOrderById(id);
            if(data != null)
            {
                data.Client = order.Client;
                data.Description = order.Description;
                data.Responsible = order.Responsible;
                data.Status = Convert.ToInt32(order.Status);
                data.Done_At = order.Done_At;

                _orderService.PutOrder(data);
            }

            return data;
        }
    }
}
