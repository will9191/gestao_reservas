using Microsoft.EntityFrameworkCore;
using Reserve.Entity;

namespace Reserve.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options): DbContext()
    {
        public DbSet<ReserveEntity> Reserves { get; set; }
    }
}
