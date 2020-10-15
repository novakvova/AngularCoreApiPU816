using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastFood.WebApi.Helpers
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
