using Microsoft.EntityFrameworkCore;
using Reserve.Model;
using Reserve.Data;
using Reserve.Entity;

namespace Reserve.Services
{
    public class ReserveService(AppDbContext _context)
    {
        public async Task<ReserveResponse> NewReserve(ReserveRequest reserve)
        {
            var result = await _context.Reserves
                .FirstOrDefaultAsync<ReserveEntity>(r => r.UniqueIdentifier == reserve.UniqueIdentifier);

            var response = new ReserveResponse();
            response.UniqueIdentifier = reserve.UniqueIdentifier;

            if (result == null)
            {
                var newReserve = new ReserveEntity
                {
                    UniqueIdentifier = reserve.UniqueIdentifier,
                    IsAvailable = true,
                    CreatedAt = DateTime.UtcNow
                };

                await _context.AddAsync(newReserve);
                await _context.SaveChangesAsync();

                response.IsAvailable = true;
            } else
            {
                response.IsAvailable = result.IsAvailable;
                response.Message = response.IsAvailable ? "Reserve is available." : "Reserve is not available.";
            }

            return response;
        }

        public async Task<ReserveResponse> GetReserveStatus(ReserveRequest reserve)
        {
            var result = await _context.Reserves
                .FirstOrDefaultAsync<ReserveEntity>(r => r.UniqueIdentifier == reserve.UniqueIdentifier);
            
            if (result == null)
                throw new KeyNotFoundException("No reserve found for the provided identifier.");

            return new ReserveResponse
            {
                Message = result.IsAvailable ? "Reserve is available." : "Reserve is not available.",
                UniqueIdentifier = result.UniqueIdentifier,
                IsAvailable = result.IsAvailable
            };
        }

        public async Task<Response> BookReserve(string uniqueIdentifier)
        {
            var reserve = await _context.Reserves.FirstOrDefaultAsync<ReserveEntity>(r => r.UniqueIdentifier == uniqueIdentifier);

            if (reserve == null)
            {
                throw new KeyNotFoundException("No reserve found for the provided identifier.");
            }

            reserve.IsAvailable = true ? reserve.IsAvailable = false : throw new InvalidOperationException("Reserve is already booked.");
            _context.Reserves.Update(reserve);
            await _context.SaveChangesAsync();
            return new Response
            {
                Message = "Successfully reserved"
            };

        }
    }
}
