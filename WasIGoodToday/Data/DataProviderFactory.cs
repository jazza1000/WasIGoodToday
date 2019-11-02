namespace Data
{
    public  class DataProviderFactory: IDataProviderFactory
    {
        public  MongoDataProvider<T> GetDataProvider<T>(string connection)
        {
            return new MongoDataProvider<T>(connection);
        }
    }
}
