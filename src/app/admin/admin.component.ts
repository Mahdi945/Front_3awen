import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  payments: any[] = []; // Stocker les paiements ici

  constructor(private http: HttpClient) {
    // Enregistrer les composants nécessaires de Chart.js
    Chart.register(...registerables);
  }

  async ngOnInit() {
    // Récupérer les paiements au chargement du composant
  

    // Charger les données pour les graphiques
    this.loadUserCountByMonth();
    this.loadUserCountByCity();
    this.loadEventCountByMonth();
    this.loadEventCountByType();
    this.loadRaisedAmountByMonth();
  }

 

  loadUserCountByMonth() {
    this.http.get<any[]>('http://localhost:3000/api/users/countbymonth').subscribe(data => {
      const labels = data.map(item => `Month ${item._id}`);
      const counts = data.map(item => item.count);

      new Chart('userCountByMonth', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'User Count by Month',
            data: counts,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'User Count'
              }
            }
          }
        }
      });
    });
  }

  loadUserCountByCity() {
    this.http.get<any[]>('http://localhost:3000/api/users/countbycity').subscribe(data => {
      const labels = data.map(item => item._id);
      const counts = data.map(item => item.count);

      new Chart('userCountByCity', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'User Count by City',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'City'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'User Count'
              }
            }
          }
        }
      });
    });
  }

  loadEventCountByMonth() {
    this.http.get<any[]>('http://localhost:3000/api/events/countbymonth').subscribe(data => {
      const labels = data.map(item => `Month ${item._id}`);
      const counts = data.map(item => item.count);

      new Chart('eventCountByMonth', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Event Count by Month',
            data: counts,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Event Count'
              }
            }
          }
        }
      });
    });
  }

  loadEventCountByType() {
    this.http.get<any[]>('http://localhost:3000/api/events/countbytype').subscribe(data => {
      const labels = data.map(item => item._id);
      const counts = data.map(item => item.count);

      new Chart('eventCountByType', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Event Count by Type',
            data: counts,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Event Type'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Event Count'
              }
            }
          }
        }
      });
    });
  }

  loadRaisedAmountByMonth() {
    this.http.get<any[]>('http://localhost:3000/api/events/raisedamountbymonth').subscribe(data => {
      const labels = data.map(item => `Month ${item._id}`);
      const amounts = data.map(item => item.totalRaised);

      new Chart('raisedAmountByMonth', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Raised Amount by Month',
            data: amounts,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Raised Amount'
              }
            }
          }
        }
      });
    });
  }
}