﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_docs.Models;
using cg_docs.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace cg_docs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly cgdocsContext _cgcontext;
       

      
        public UserController(cgdocsContext project)
        {
            _cgcontext = project;
          
        }
       

        // GET: api/PlayersInfo
        [HttpGet]
        public IEnumerable<Users> Get()
        {
            var getInfo = _cgcontext.Users.ToList();
            return getInfo;
        }



        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _cgcontext.Users.First(obj => obj.UserId == id);

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
        public void Post([FromBody] UserRequest value)
        {
            Users obj = new Users();
            obj.Username = value.Username;
            obj.Password = value.Password;
            obj.CreatedAt = value.CreatedAt;
       
            _cgcontext.Users.Add(obj);
            _cgcontext.SaveChanges();


        }


        //[HttpGet("{value}")]
        //public IActionResult Get(string value)
        //{

        //    var result = _cgcontext.Users.Where(obj => obj.Username.Contains(value));
        //    return Ok(result);



        //}


        // PUT: api/User/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
