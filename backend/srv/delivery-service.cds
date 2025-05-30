using {delivery as d} from '../db/schema';

type DeliveryInput : {
    deliveryDate : Date;
    recipient    : String;
    address      : String;
}

type LabelResponse : {
    message  : String;
    filename : String;
    file     : LargeBinary;
}

@rest
service DeliveryService {
    entity Deliveries as projection on d.Deliveries;
    action scheduleDelivery(data : DeliveryInput) returns Deliveries;
    action printLabel(ID : UUID)                  returns LabelResponse; // ✅ FIXED
}
