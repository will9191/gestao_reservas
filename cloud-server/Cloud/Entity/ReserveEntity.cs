using Newtonsoft.Json;

namespace Reserve.Entity
{
    public class ReserveEntity
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        [JsonProperty("unique_identifier")]
        public string UniqueIdentifier { get; set; }
        [JsonProperty("is_available")]
        public bool IsAvailable { get; set; }
        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        public ReserveEntity()
        {
            UniqueIdentifier = string.Empty;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
