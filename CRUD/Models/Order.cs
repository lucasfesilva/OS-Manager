namespace CRUD.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string? Client { get; set; }
        public string? Description { get; set; }
        public string? Responsible { get; set; }
        public int Status { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Done_At { get; set; }
    }
}
