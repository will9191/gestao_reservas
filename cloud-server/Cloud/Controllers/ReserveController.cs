using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Reservation.Model;
using Reservation.Services;

namespace Reservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReserveController : ControllerBase
    {
        private ReserveService _service;

        public ReserveController(ReserveService service)
        {
            _service = service;
        }

        [HttpPost("new-reserve")]
        public ActionResult NewReserve(ReserveModel reserve)
        {
            if (reserve == null || AddressInvalid(reserve.Address))
                return BadRequest("Fill all the required fields");

            try
            {
                var result = _service.NewReserve(reserve);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }

        [HttpGet("status")]
        public ActionResult GetReserveStatus(AddressModel address)
        {
            if (AddressInvalid(address))
                return BadRequest("Fill all the required fields");

            try
            {
                var result = _service.GetReserveStatus(address);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("book-reserve")]
        public ActionResult BookReserve(AddressModel address) 
        {
            string reserve = GenerateUniqueIdentifier(address);
            try { 

            }
            catch { }
        }

        private bool AddressInvalid(AddressModel address)
        {
            return string.IsNullOrEmpty(address.ZipCode) ||
                   address.Number < 0;
        }

        private string GenerateUniqueIdentifier(AddressModel address)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(address?.ZipCode);
            sb.Append(address?.Number.ToString());
            sb.Append(address?.Unit);
            sb.Append(address?.UnitNumber.ToString());
            string uniqueIdentifier = sb.ToString();

            return uniqueIdentifier;
        }
    }
}
