import mongoose from 'mongoose';

async function CloseAppIntegration(server) {
  server.close();
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}

export default CloseAppIntegration;
