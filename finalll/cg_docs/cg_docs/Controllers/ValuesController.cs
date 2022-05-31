using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_docs.Models;
using cg_docs.RequestModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cg_docs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        private readonly cgdocsContext _cgcontext;
        public ValuesController(cgdocsContext project)
        {
            _cgcontext = project;
        }

        // GET: api/PlayersInfo
        [HttpGet]
        public IActionResult Get()
        {
            var getInfo = _cgcontext.Folders.ToList();
            return Ok(getInfo);
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


        // POST: api/PlayersInfo
        [HttpPost]
        public void Post([FromBody] FoldersRequest value)
        {
            Folders obj = new Folders();
            obj.FolderName = value.FolderName;
            obj.CreatedAt = value.CreatedAt;
            obj.CreatedBy = value.CreatedBy;
            obj.IsDeleted = value.IsDeleted;
            _cgcontext.Folders.Add(obj);
            _cgcontext.SaveChanges();


        }
        [HttpGet("{value}")]
        public IActionResult Get(string value)
        {

            var result = _cgcontext.Folders.Where(obj => obj.FolderName.Contains(value));
            return Ok(result);



        }

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
