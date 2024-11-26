import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  users: User[] = [];
  dropdownIndex: number | null = null;
  searchQuery: any = {};
  showAdvancedSearch: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:3000/api/users/all').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  searchUsers() {
    const params = new URLSearchParams(this.searchQuery).toString();
    this.http.get<User[]>(`http://localhost:3000/api/users/search?${params}`).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error searching users:', error);
      }
    });
  }

  deleteUser(userId: string) {
    this.http.delete(`http://localhost:3000/api/users/${userId}`).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }
  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }
}