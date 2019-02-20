using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class MongoDataProvider<T>
    {
        private readonly IMongoClient m_Client;
        private readonly IMongoDatabase m_Database;

        public IMongoClient Client
        {
            get { return m_Client; }
        }

        public MongoDataProvider(string  connection)
        {

            m_Client = new MongoClient(connection);
            m_Database = m_Client.GetDatabase("wasigood");
        }

        public async Task<List<T>> GetMany(Expression<Func<T, bool>> expression)
        {
            return await m_Database.GetCollection<T>(nameof(T).ToLower()).Find(expression).ToListAsync();
        }

        public async Task<T> GetSingle(Expression<Func<T,bool>> expression)
        {
            var item = await m_Database.GetCollection<T>(nameof(T).ToLower())
                .Find(expression)
                .SingleOrDefaultAsync();
            return item;
        }

        public async Task Upsert(T item, Expression<Func<T, bool>> findExisting)
        {
            var collection = m_Database.GetCollection<T>(nameof(T).ToLower());
            var existing = await collection.FindAsync(findExisting);

            if (existing.FirstOrDefault() == null)
                await collection.InsertOneAsync(item);
            else
                await collection.ReplaceOneAsync(findExisting, item);
        }



    }
}
