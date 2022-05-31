﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cg_docs.Models;
using cg_docs.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace cg_docs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly cgdocsContext _cgcontext;

        public LoginController(IConfiguration config,cgdocsContext cg)
        {
            _config = config;
            _cgcontext = cg;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(login);

            if (user != null)
            {
                var tokenString = BuildToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }
        private string BuildToken(UserRequest user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private UserRequest Authenticate(LoginModel login)
        {
            UserRequest user = null;
            var result = _cgcontext.Users.FirstOrDefault(obj => obj.Username==login.username);
            // var res= _cgcontext.Users.FirstOrDefault(obj => obj.Password == login.password);
          
            try
            {
                if (result.Username != null && result.Password==login.password)
                {
                    user = new UserRequest { Username = result.Username, Password = result.Password };
                }
            }catch(Exception e)
            {
                return null;
            }
           
            return user;
        }
        public class LoginModel
        {
            public string username { get; set; }
            public string password { get; set; }
        }

        //private class UserModel
        //{
        //    public string Name { get; set; }
        //    public string Email { get; set; }
        //    public DateTime Birthdate { get; set; }

        //}
    }

}