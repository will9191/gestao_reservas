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
                return Ok(_service.BookReserve(address));
            }
            catch (Exception) { 
                return StatusCode(500, "An unexpected error occurred");
            }
        }

        private bool AddressInvalid(AddressModel address)
        {
            return string.IsNullOrEmpty(address.ZipCode) ||
                   string.IsNullOrEmpty(address.Number);
        }

        public string GenerateUniqueIdentifier(AddressModel address)
        {
            string zipCodeFormatted = address.ZipCode.Trim().Replace("-", "");

            StringBuilder sb = new StringBuilder();
            sb.Append(zipCodeFormatted);
            sb.Append(address?.Number);
            sb.Append(address?.Unit);
            sb.Append(address?.UnitNumber);
            string uniqueIdentifier = sb.ToString();

            return uniqueIdentifier;
        }
    }
}
