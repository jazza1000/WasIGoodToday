using Data;
using System.Threading.Tasks;

namespace WasIGoodToday.Services
{
    public interface IUserService
    {
        Task<bool> Authenticate(string userName, string password);
        Task<User> CreateUser(string userName, string password);
    }
}
