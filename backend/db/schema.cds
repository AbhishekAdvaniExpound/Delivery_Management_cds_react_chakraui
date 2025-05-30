namespace delivery;

entity Deliveries {
    key ID           : UUID;
        deliveryDate : Date;
        recipient    : String;
        address      : String;
        status       : String; // Scheduled, In Transit, Delivered
        labelPrinted : Boolean default false;
}
