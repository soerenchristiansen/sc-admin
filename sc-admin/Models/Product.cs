using System;
using System.Collections.Generic;
using System.Data.SqlTypes;

namespace sc_admin.Models
{
    public class Product
    {
        public Product()
        {
            Categories = new List<Category>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string DetailedDescription { get; set; }
        public string Color { get; set; }
        public string Brand { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdated { get; set; }
        public int MarketingReady { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public string ParentCategory { get; set; }
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
        public decimal Width { get; set; }
        public string MeasureType { get; set; }
        public IList<Category> Categories { get; set; }
        public IList<ProductThumnail> ProductThumnails { get; set; }
    }
}