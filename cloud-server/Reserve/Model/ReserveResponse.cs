using Newtonsoft.Json;

namespace Reserve.Model
{
    public class ReserveResponse : Response
    {
        [JsonProperty("unique_identifier")]
        public string UniqueIdentifier { get; set; } = string.Empty;
        [JsonProperty("is_available")]
        public bool IsAvailable { get; set; }
    }
}
