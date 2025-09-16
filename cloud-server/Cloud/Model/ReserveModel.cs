using Newtonsoft.Json;

namespace Reservation.Model
{
    public class ReserveModel
    {
        [JsonProperty("address")]
        public AddressModel Address { get; set; }

        public ReserveModel()
        {
            Address = new AddressModel();
        }
    }
}
