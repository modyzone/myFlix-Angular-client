import { Component, OnInit } from '@angular/core';
import { DirectorComponent } from '../director/director.component';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  FavoriteMovies: any[] = [];
  dialog: any;
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  
   /**
   *open a dialog to display the GenreCardComponent
   * @param name {string}
   * @param description {string}
   */
   openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

   /**
   * open a dialog to display the DirectorCardComponent
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   * @param death {string}
   */
    openDirectorDialog(
      name: string,
      bio: string,
      birth: string,
      death: string
    ): void {
      this.dialog.open(DirectorComponent, {
        data: { name: name, bio: bio, birth: birth, death: death },
        width: '300px',
      });
    }

     /**
   * open a dialog to display the SynopsisCardComponent
   * @param title {string}
   * @param description {string}
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }
    /**
   * get an array of the user's favorite movies from user's data
   */
     getFavoriteMovies(): void {
      const user = localStorage.getItem('user');
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.FavoriteMovies = resp.FavoriteMovies;
        console.log(this.FavoriteMovies);
      });
    }
  /**
   * check if the movie is the user's favorite?
   * @param MovieID {string}
   * @returns true or false
   */
   isFavorite(MovieID: string): boolean {
    return this.FavoriteMovies.some((movie) => movie._id === MovieID);
  }

}
