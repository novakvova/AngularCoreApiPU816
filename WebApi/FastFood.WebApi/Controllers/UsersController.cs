using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FastFood.WebApi.Entities;
using FastFood.WebApi.Models;
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
             var domain= $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            var users = await _context.Users.Select(x => new UserItemViewModel
            {
                Id = x.Id,
                Email = x.Email,
                Age =  x.Age,
                Image =  $"{domain}/Files/{x.Image}",
                EmailConfirmed = x.EmailConfirmed
            }).ToListAsync();
            return Ok(users);
        }

        //переглянути деталі про користувача
        [HttpGet("details/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var users = await _context.Users.Select(x => new UserDetailViewModel
            {
                Id = x.Id,
                Email = x.Email,
                Age = x.Age,
                Image = x.Image,
                Phone = x.PhoneNumber,
                EmailConfirmed = x.EmailConfirmed
            }).SingleOrDefaultAsync(x => x.Id == id);
            return Ok(users);
        }
        //Отимати інформацію про користувача, якого будемо міняти
        [HttpGet("edit/{id}")]
        public async Task<IActionResult> Edit(int id)
        {
            var users = await _context.Users.Select(x => new UserEditViewModel
            {
                Id = x.Id,
                Age = x.Age,
                Image = x.Image,
                Phone = x.PhoneNumber
            }).SingleOrDefaultAsync(x => x.Id == id);
            return Ok(users);
        }
        //Зберегти дані про користувача
        [HttpPut("save")]
        public async Task<IActionResult> Save(UserEditViewModel model)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Id == model.Id);

            return Ok(user);
        }
        //видалити користувача

        //додати користувача
    }
}
