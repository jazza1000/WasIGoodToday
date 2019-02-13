using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Data
{
    public class DataProvider
    {
        private readonly IMongoClient m_Client;
        private readonly IMongoDatabase m_Database;

        public IMongoClient Client
        {
            get { return m_Client; }
        }


        public DataProvider(IMongoClient mongoClient)
        {
            m_Client = mongoClient;
            m_Database = m_Client.GetDatabase("wasigood");
        }


        public async Task<List<Month>> GetMonthsByYear(int year)
        {
            return await m_Database.GetCollection<Month>("month")
                .Find(x => x.Year == year).ToListAsync();

        }

        public async Task<Month> GetMonth(string name, int year)
        {
            var month = await m_Database.GetCollection<Month>("month")
                .Find(x => x.Name.ToLower() == name.ToLower() && x.Year == year)
                .SingleOrDefaultAsync();
            return month;
        }

        public async Task UpsertMonth(Month month)
        {
            var existing = await m_Database.GetCollection<Month>("month").FindAsync(x => x.Year == month.Year && x.Name == month.Name);
            if (existing.FirstOrDefault() == null)
                await m_Database.GetCollection<Month>("month").InsertOneAsync(month);
            else
            {
                await m_Database.GetCollection<Month>("month").ReplaceOneAsync(x => x.Year == month.Year && x.Name == month.Name,
                    month//,
                    //new UpdateOptions { IsUpsert = true }
                );
            }
        }

    }
}
