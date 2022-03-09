import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
	@Input() mainhead!: string;
	@Input() mainheadLink!: string;
    @Input() heading!: string;
    @Input() icon!: string;
    @Input() mainIcon!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
