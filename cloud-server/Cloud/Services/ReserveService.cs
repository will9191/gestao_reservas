using Reservation.Model;
using Reservation.Repository;

namespace Reservation.Services
{
    public class ReserveService
    {
        private ReserveRepository _repository;

        public ReserveService(ReserveRepository repository)
        {
            _repository = repository;
        }

        public string NewReserve(ReserveModel reserve)
        {
            return _repository.NewReserve(reserve);
        }

        public string GetReserveStatus(AddressModel address)
        {
            var result = _repository.GetReserveStatus(address);
            
            if (result == null)
                throw new KeyNotFoundException("No reservation found for the provided address.");

            return result;
        }

        public string BookReserve(AddressModel address)
        {
            return _repository.BookReserve(address);
        }
    }
}
