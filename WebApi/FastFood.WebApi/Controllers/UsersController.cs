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

        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(int? userId)
        {
            DbUser user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return BadRequest("User not exist");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Edit(DbUser newUser)
        {
            DbUser user = await _context.Users.FirstOrDefaultAsync(u => u.Id == newUser.Id);

            if (user == null) return BadRequest("User not exist");

            _context.Users.Update(newUser); // TODO
            
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
