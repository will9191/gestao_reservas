namespace Reserve.Model
{
    public class ReserveResponse : Response
    {
        public string UniqueIdentifier { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
    }
}
