using Newtonsoft.Json;

namespace Reserve.Model
{
    public class Response
    {
        [JsonProperty("message")]
        public string Message { get; set; } = string.Empty;
    }
}
