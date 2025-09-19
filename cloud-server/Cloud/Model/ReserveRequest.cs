using Newtonsoft.Json;

namespace Reserve.Model
{
    public class ReserveRequest
    {
        [JsonProperty("unique_identifier")]
        public string UniqueIdentifier { get; set; } = string.Empty;
    }
}
