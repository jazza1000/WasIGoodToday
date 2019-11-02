using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
    public interface IDataProviderFactory
    {
        MongoDataProvider<T> GetDataProvider<T>(string connection);
    }
}
