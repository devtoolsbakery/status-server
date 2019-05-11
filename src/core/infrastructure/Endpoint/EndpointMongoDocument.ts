import { Document, Schema, model} from 'mongoose';

export interface EndpointMongoDocument extends Document {
  _id: string;
  userId: string; 
  host: number;
  name: string;
  latestHealthChecks: [{status: string, timeInMs: number, date: Date }];
  updated: Date;
  downtimeMinutes: number;
  firstHealthCheckDate: Date;
  serviceDownDate: Date;
};

export const EndpointMongoSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type:String, required: true },
  host: { type:String, required: true },
  name: { type:String, required: true },
  latestHealthChecks: [{ _id: false, status: String, timeInMs: Number, date: Date }],
  updated: { type: Date },
  downtimeMinutes: { type: Number, default: 0 },
  firstHealthCheckDate: { type: Date },
  serviceDownDate: { type: Date }
});

const EndpointMongoDocument = model<EndpointMongoDocument>('Endpoint', EndpointMongoSchema);
export default EndpointMongoDocument;
