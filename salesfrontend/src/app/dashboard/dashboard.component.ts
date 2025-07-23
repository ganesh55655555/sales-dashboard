import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showForm = false;
  selectedRow: any = null;
  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('userName');
    if (!storedUser) {
      // Redirect to login if not logged in
      this.router.navigate(['/login']);
    } else {
      this.userName = storedUser;
    }
  }

  goHome(): void {
  this.clearSelection(); // resets form and returns to table view
}




  editRow(row: any) {
    this.selectedRow = row;
    this.showForm = true;
  }
  // Called when "Leads" button is clicked (for adding new lead)
  openLeadsForm() {
    this.selectedRow = null;
    this.showForm = true;
  }

  clearSelection = () => {
    this.selectedRow = null;
    this.showForm = false;
  };

  reload = () => {
    this.clearSelection();
    setTimeout(() => this.showForm = false, 0); // force reload of table
  };

  logout(): void {
    localStorage.clear(); // remove login token / user
    this.router.navigate(['/login']);
  }

}

