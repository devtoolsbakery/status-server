import { Document, Schema, model} from 'mongoose';

export interface EndpointMongoDocument extends Document {
  _id: string;
  userId: string; 
  url: string;
  name: string;
  latestDailyStatuses: [{
    date: Date, 
    incidents: [], 
    averageResponseTime: number, 
    totalSuccessfulHealthChecks: number
  }];
  updated: Date;
  downtimeMinutes: number;
  firstHealthCheckDate: Date;
  serviceDownDate: Date;
};

export const EndpointMongoSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type:String, required: true },
  url: { type:String, required: true },
  name: { type:String, required: true },
  latestDailyStatuses: [{ 
    _id: false,
    date: Date, 
    incidents: [], 
    averageResponseTime: Number, 
    totalSuccessfulHealthChecks: Number

  }],
  updated: { type: Date },
  downtimeMinutes: { type: Number, default: 0 },
  firstHealthCheckDate: { type: Date },
  serviceDownDate: { type: Date }
});

const EndpointMongoDocument = model<EndpointMongoDocument>('Endpoint', EndpointMongoSchema);
export default EndpointMongoDocument;
