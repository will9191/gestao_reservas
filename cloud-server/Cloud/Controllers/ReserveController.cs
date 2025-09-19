using Microsoft.AspNetCore.Mvc;
using Reserve.Model;
using Reserve.Services;

namespace Reserve.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReserveController(ReserveService service) : ControllerBase
    {
        private readonly ReserveService _service = service;

        [HttpPost("new-reserve")]
        public async Task<ActionResult> NewReserve(ReserveRequest reserve)
        {
            if (reserve == null)
                return BadRequest("Fill all the required fields");

            try
            {
                var result = await _service.NewReserve(reserve);
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
        public async Task<ActionResult> GetReserveStatus(ReserveRequest request)
        {
            try
            {
                var result = await _service.GetReserveStatus(request);
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

        [HttpPatch("book-reserve/:uniqueIdentifier")]
        public async Task<ActionResult> BookReserve(string uniqueIdentifier) 
        {
            try {
                return Ok(await _service.BookReserve(uniqueIdentifier));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception) {
                return StatusCode(500, "An unexpected error occurred");
            }
        }
    }
}
