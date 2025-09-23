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

        [HttpGet("health")]
        public ActionResult HealthCheck()
        {
            return Ok("Reserve Service is running.");
        }

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
                return Conflict(new Response { Message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new Response { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response { Message = $"An unexpected error occurred: {ex.Message}" });
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
                return NotFound(new Response { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Message = ex.Message });
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
                return NotFound(new Response { Message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new Response { Message = ex.Message });
            }
            catch (Exception ex) {
                return StatusCode(500, new Response { Message = $"An unexpected error occurred: {ex.Message}" });
            }
        }
    }
}
