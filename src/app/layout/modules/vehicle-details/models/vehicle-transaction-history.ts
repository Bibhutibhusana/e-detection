import { BaseEntity } from "src/app/layout/models/base-entity";

export class VehicleTransactionHistory extends BaseEntity{
id!: number;
vehicleNo!: string;
vtClass!: string;
transactionDate!: Date;	
}