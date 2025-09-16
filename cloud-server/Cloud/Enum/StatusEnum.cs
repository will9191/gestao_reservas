using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace Reserve.Enum
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum StatusEnum
    {
        [EnumMember(Value = "available")]
        Available,
        [EnumMember(Value = "reserved")]
        Reserved,
        [EnumMember(Value = "non-existent")]
        NonExistent
    }
}
