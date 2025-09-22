using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Reserve.Entity
{
    [Table("Reserve")]
    public class ReserveEntity
    {
        [JsonProperty("id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
