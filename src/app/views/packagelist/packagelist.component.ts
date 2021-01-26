import { Component, OnInit } from '@angular/core';
import { getListPackage } from '../../models/packageListModel';
import { ApiConnectionService } from '../../services/api-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packagelist',
  templateUrl: './packagelist.component.html',
  styleUrls: ['./packagelist.component.css']
})
export class PackagelistComponent implements OnInit {

  packages: getListPackage[];

  constructor(private Api: ApiConnectionService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.Api.getPackages(localStorage.getItem('username')).subscribe(data => {
        let DataArray = Object.keys(data).map((key) => [Number(key), data[key]]);
        this.packages = DataArray[0][1];
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }
}
