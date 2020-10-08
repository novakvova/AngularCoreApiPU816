using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FastFood.WebApi.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FastFood.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EfContext _context;
        public UsersController(EfContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.Select(x => new
            {
                x.Id,
                x.Email,
                x.Age,
                x.Image,
                x.PhoneNumber,
                x.EmailConfirmed
            }).ToListAsync();
            return Ok(users);
        }
    }
}
