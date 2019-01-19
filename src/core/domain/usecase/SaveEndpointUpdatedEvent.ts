import EndpointUpdatedEventRepository from "../model/EndpointUpdatedEventRepository";
import EndpointUpdatedEvent, { EndpointUpdatedEventData } from "../model/event/EndpointUpdatedEvent";

export default class SaveEndpointUpdatedEvent {

  private endpointUpdatedEventRepository: EndpointUpdatedEventRepository;

  constructor(endpointUpdatedEventRepository: EndpointUpdatedEventRepository) {
    this.endpointUpdatedEventRepository = endpointUpdatedEventRepository;
  }
  
  async execute(endpointUpdatedEvent: EndpointUpdatedEvent) {
    const eventData = endpointUpdatedEvent.getData() as EndpointUpdatedEventData;
    
    if (eventData.time > 0) {
      console.log(`✅ ${eventData.time}ms \t ${eventData.host}`);
    } else console.log(`🔴 failed \t ${eventData.host}`);

    this.endpointUpdatedEventRepository.save(eventData);
  }

}
