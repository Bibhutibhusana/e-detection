import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/alert/alert.service';
import { EChallan } from '../../vehicle-details/models/echallan';
import { EchallanService } from '../../vehicle-details/service/echallan.service';

@Component({
  selector: 'app-echallan-add',
  templateUrl: './echallan-add.component.html',
  styleUrls: ['./echallan-add.component.css']
})
export class EchallanAddComponent implements OnInit {
	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}
	

}
