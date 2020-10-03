import { Document, Schema, model} from 'mongoose';

export interface HealthCheckMongoDocument extends Document {
  _id: string;
  endpointId: string;
  host: number;
  address: string;
  time: number;
  createdAt: Date;
};

export const HealthCheckSchema = new Schema({
  _id: { type: String, required: true },
  endpointId: { type:String, required: true },
  host: { type:String, required: true },
  address: { type:String },
  time: { type: Number },
  createdAt: { type: Date }
});

const HealthCheckMongoDocument = model<HealthCheckMongoDocument>('HealthCheck', HealthCheckSchema);
export default HealthCheckMongoDocument;


