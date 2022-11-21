import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Mongoose } from 'mongoose';

const describeWithDB = (name: string, fn: () => void) => 
  describe(name, () => {
    let con: Mongoose;
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      con = await mongoose.connect(mongoServer.getUri(), {});
    });

    afterAll(async () => {
      if (con) {
        await con.disconnect();
      }
      if (mongoServer) {
        await mongoServer.stop();
      }
    });

    afterEach(async () => {
      const collections = mongoose.connection.collections;

      for (const key in collections) {
          const collection = collections[key];
          await collection.deleteMany({});
      }
    });

    fn();
  });

 export default describeWithDB;