import { Document, Schema, model} from 'mongoose';

export interface EndpointMongoDocument extends Document {
  _id: string;
  userId: string; 
  host: number;
  name: string;
  uptime: number;
  latestHealthChecks: [{}];
  updated: Date;
};

export const EndpointMongoSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type:String, required: true },
  host: { type:String, required: true },
  name: { type:String, required: true },
  uptime: { type: Number, required: true, default: 0 },
  latestHealthChecks: { type: [{}] },
  updated: { type: Date }
});

const EndpointMongoDocument = model<EndpointMongoDocument>('Endpoint', EndpointMongoSchema);
export default EndpointMongoDocument;
