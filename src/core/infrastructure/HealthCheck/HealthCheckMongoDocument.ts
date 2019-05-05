import { Document, Schema, model} from 'mongoose';

export interface HealthCheckMongoDocument extends Document {
  _id: {};
  endpointId: string; 
  host: number;
  address: string;
  statusCode: number;
  time: number;
  body: string; 
  createdAt: Date;
};

export const HealthCheckSchema = new Schema({
  endpointId: { type:String, required: true },
  host: { type:String, required: true },
  address: { type:String },
  statusCode: { type: Number, required: true, default: 0 },
  time: { type: Number },
  body: { type: String },
  createdAt: { type: Date }
});

const HealthCheckMongoDocument = model<HealthCheckMongoDocument>('HealthCheck', HealthCheckSchema);
export default HealthCheckMongoDocument;


