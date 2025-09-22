using Microsoft.EntityFrameworkCore;
using Reserve.Entity;

namespace Reserve.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options): DbContext(options)
    {
        public DbSet<ReserveEntity> Reserves { get; set; }
    }
}
