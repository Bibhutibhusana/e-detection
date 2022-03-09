import { BaseEntity } from "src/app/layout/models/base-entity";

export class EChallan extends BaseEntity{
	id!:number;
	challanTrackId!: string;
	vehicleNo!:string;
	transactionDate!:Date;
	vtClass!:string;
	vhClass!:string;
	purposeCode!:string;
  	challanNo!:string;
	opDate = new Date();
	challanIssueDate !: Date;
	taxUpto!: boolean;
	fitUpto!: boolean;
	insUpto!: boolean;
	nonUseStat!: boolean;
	
	
}
