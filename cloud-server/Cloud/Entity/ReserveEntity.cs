using Newtonsoft.Json;
using Reserve.Enum;

namespace Reserve.Entity
{
    public class ReserveEntity
    {
        [JsonProperty("unique_identifier")]
        public string UniqueIdentifier { get; set; }
        [JsonProperty("status")]
        public StatusEnum Status { get; set; }
        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        public ReserveEntity()
        {
            UniqueIdentifier = string.Empty;
            Status = StatusEnum.Available;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
