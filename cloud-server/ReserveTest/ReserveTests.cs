using Reservation.Controllers;
using Reservation.Model;
using Reservation.Repository;
using Reservation.Services;

namespace ReserveTest
{
    public class ReserveTests
    {
        [Fact]
        public void ValidarUniqueIdentifier()
        {
            AddressModel address= new AddressModel
            {
                ZipCode = "12345",
                Number = "100",
            };

           
            ReserveRepository repository = new ReserveRepository();
            ReserveService service = new ReserveService(repository);
            ReserveController controller = new ReserveController(service);

            string expectedUniqueIdentifier = controller.GenerateUniqueIdentifier(address);

            Assert.Equal("12345100", expectedUniqueIdentifier);
        }
    }
}
