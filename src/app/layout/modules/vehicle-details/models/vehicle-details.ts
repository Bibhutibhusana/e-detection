import { BaseEntity } from "src/app/layout/models/base-entity";

export class VehicleDetails extends BaseEntity{
	id!: number;
vehicleNo!: string;
transactionDate: Date = new Date();
vtClass!: string;
vhClass!: string;
taxUpto!: Date;
fitUpto!: Date;
insUpto!: Date;
nonUseStat!: string;	
} 