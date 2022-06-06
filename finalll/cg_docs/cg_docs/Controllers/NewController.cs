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
    public class NewController : ControllerBase
    {
        private readonly cgdocsContext _cgcontext;



        public NewController(cgdocsContext project)
        {
            _cgcontext = project;

        }
        

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _cgcontext.Folders.First(obj => obj.FoldersId == id);

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
