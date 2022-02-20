
import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar, 
    public router: Router,
    public dialog: MatDialog
    ) {}

    ngOnInit(): void {}

      /**
   * Routes user to movies page
   */
  goToMoviesPage(): void {
    this.router.navigate(['movies']);
  }
   /**
   * Routes user to profile page
   */
    goToProfilePage(): void {
      this.router.navigate(['users']);
    }
  /**
   * Logs a user out, clears the localStorage
   * Re-routes to the welcome page
   */
   logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }

  
}