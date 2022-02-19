import { Component, OnInit } from '@angular/core';
import { DirectorComponent } from '../director/director.component';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  FavoriteMovies: any[] = [];
  user: any[] = [];
  
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}

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
   * use API end-point to add user favorite movie
   * @function addFavoriteMovie
   * @param MovieID {string}
   * @param title {string}
   * @returns an array of the movie object in json format
   */
    addFavoriteMovie(MovieID: string, title: string): void {
      this.fetchApiData.addFavoriteMovie(MovieID).subscribe((resp: any) => {
        this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
          duration: 4000,
        });
        this.ngOnInit();
      });
      return this.getFavoriteMovies();
    }

      /**
   * use API end-point to remove user favorite
   * @function deleteFavoriteMovie
   * @param MovieId {string}
   * @param title {string}
   * @returns updated user's data in json format
   */
  removeFavoriteMovie(MovieId: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favorites!`,
        'OK',
        {
          duration: 4000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
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
  /**
  * toggle add/remove user's favorite function.
  * if the movie is not on the favorite list, call ...
  * @function addFavoriteMovie
  * if the movie is already on the user favorite list, call ...
  * @function removeFavoriteMovie
  * @param movie {any}
  */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }

}
