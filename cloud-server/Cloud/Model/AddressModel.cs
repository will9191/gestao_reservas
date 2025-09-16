using Newtonsoft.Json;

namespace Reservation.Model
{
    public class AddressModel
    {
        [JsonProperty("zip_code")]
        public string ZipCode { get; set; }
        [JsonProperty("number")]
        public int Number { get; set; }
        [JsonProperty("unit")]
        public string Unit { get; set; }
        [JsonProperty("unit_number")]
        public int UnitNumber { get; set; }

        public AddressModel() { 
            ZipCode = Unit  = string.Empty;
        }
    }
}
