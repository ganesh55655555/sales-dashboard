import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent implements OnInit {
  @Output() editRequested = new EventEmitter<any>();

  sales: any[] = [];
  filtered: any[] = [];
  filter = '';

  selectedOpportunity: string = '';
  selectedSalesStage: string = '';
  fromDate: string = '';
  toDate: string = '';

  opportunityList: string[] = [
    'AWS', 'AWS - New Account', 'AWS BILL MIGRATE', 'AWS Direct to Our Billing',
    'GCP - New Account', 'GWS - New Account', 'GWS - Direct to Our Billing',
    'M365', 'M365 - New Account', 'Windows 11 pro', 'Azure', 'Cyber Security'
  ];

  salesStageList: string[] = [
    '1) Lead (Initial Requirement / Gathering)', '2) Qualification', '3) proposal',
    '4) Negotiation', '5) Closed Own (Converted)', '6) Closed Lost'
  ];

  tableHeaders: string[] = [];

  constructor(private service: SalesService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => {
      this.sales = data;
      this.filtered = data;

      // Dynamically determine headers except `id`
      this.tableHeaders = data.length ? Object.keys(data[0]).filter(k => k !== 'id') : [];

      // Ensure 'dealWon' is included
      if (!this.tableHeaders.includes('dealWon')) {
        this.tableHeaders.push('dealWon');
      }

      this.applyFilter();
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  applyFilter() {
    this.filtered = this.sales.filter(s => {
      const matchesText = JSON.stringify(s).toLowerCase().includes(this.filter.toLowerCase());
      const matchesOpportunity = this.selectedOpportunity ? s.opportunity === this.selectedOpportunity : true;
      const matchesSalesStage = this.selectedSalesStage ? s.salesStage === this.selectedSalesStage : true;

      const recordDate = s.nextFollowUpDate?.substring(0, 10);
      const matchesFromDate = this.fromDate ? recordDate >= this.fromDate : true;
      const matchesToDate = this.toDate ? recordDate <= this.toDate : true;

      return matchesText && matchesOpportunity && matchesSalesStage && matchesFromDate && matchesToDate;
    });
  }

  edit(row: any) {
    this.editRequested.emit(row);
  }

  clearFilters() {
    this.filter = '';
    this.selectedOpportunity = '';
    this.selectedSalesStage = '';
    this.fromDate = '';
    this.toDate = '';
    this.applyFilter();
  }
}

