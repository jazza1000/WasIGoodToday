using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Microsoft.Extensions.Configuration;

namespace WasIGoodToday.Services
{
    public class UserService : IUserService
    {
        private readonly MongoDataProvider<User> m_DataProvider;

        public UserService(IConfiguration configuration)
        {
            string connection = configuration.GetConnectionString("wasIgoodConnection");
            m_DataProvider = new MongoDataProvider<User>(connection);
        }

        public async Task<bool> Authenticate(string userName, string password)
        {
            return true;
        }

        public async Task<User> CreateUser(string userName, string password)
        {
            User existingUser = await m_DataProvider.GetSingle(x => x.UserName == userName);
            if (existingUser != null)
                throw new InvalidOperationException("User already exists");

            User newUser = new User { UserName = userName, Password = password };
            await m_DataProvider.Upsert(newUser, x => x.UserName == userName);
            return newUser;
        }
    }
}
