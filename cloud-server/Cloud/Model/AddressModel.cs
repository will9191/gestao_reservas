using Newtonsoft.Json;

namespace Reservation.Model
{
    public class AddressModel
    {
        [JsonProperty("zip_code")]
        public string ZipCode { get; set; }
        [JsonProperty("number")]
        public string Number { get; set; }
        [JsonProperty("unit")]
        public string Unit { get; set; }
        [JsonProperty("unit_number")]
        public string UnitNumber { get; set; }

        public AddressModel() { 
            ZipCode = Number = Unit = UnitNumber = string.Empty;
        }
    }
}
