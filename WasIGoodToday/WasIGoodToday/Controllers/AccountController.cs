using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using WasIGoodToday.Services;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;

namespace WasIGoodToday.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IUserService m_UserService;
        public AccountController(IConfiguration configuration, IUserService userService)
        {

            m_UserService = userService;
        }

        [HttpPost("create")]
        public async Task<User> Post([FromBody] User user)
        {
            //save user to database with hashed password
            return await m_UserService.CreateUser(user.UserName, user.Password);
        }


        [HttpPost("authenticate")]
        public async Task<bool> Authenticate([FromBody]User user)
        {
            return await m_UserService.Authenticate(user.UserName, user.Password);
        }
    }
}