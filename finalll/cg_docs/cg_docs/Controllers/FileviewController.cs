using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_docs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cg_docs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileviewController : ControllerBase
    {
        private readonly cgdocsContext _cgcontext;
        public FileviewController(cgdocsContext project)
        {
            _cgcontext = project;

        }
        // GET: api/Fileview
        [HttpGet("{id}")]
        public IActionResult GetDetail(int id)
        {
            try
            {
                var result = _cgcontext.Documents.First(obj => obj.DocumentId == id);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
    }
}
