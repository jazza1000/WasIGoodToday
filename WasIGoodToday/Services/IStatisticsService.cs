using Model;
using System.Threading.Tasks;

namespace Services
{
    public interface IStatisticsService
    {
        Task<Statistics> GetStatistics(string user);
    }
}
