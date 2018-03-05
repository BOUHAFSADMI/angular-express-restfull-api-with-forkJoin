import {Component, OnInit} from '@angular/core';
import {DemoServiceService} from './demo-service.service';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {

  public foods;
  public movies;
  public books;
  public food_name;

  constructor(private _demoService: DemoServiceService) {}

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this._demoService.getFoods().subscribe(
      data => {this.foods = data; },
      err => console.error(err),
      () => console.log('done loading foods')
    );
  }


  getBooksAndMovies() {
    this._demoService.getFoods().subscribe(
      data => {
        this.books = data[0];
        this.movies = data[1];
      }
    );
  }



  createFood(name) {
        const food = {name: name};
        this._demoService.createFood(food).subscribe(
           data => {
               // refresh the list
                 this.getFoods();
               return true;
             },
           error => {
               console.error('Error saving food!');
               return Observable.throw(error);
             }
        );
      }

  updateFood(food) {
        this._demoService.updateFood(food).subscribe(
             data => {
               // refresh the list
                 this.getFoods();
               return true;
             },
           error => {
               console.error('Error saving food!');
               return Observable.throw(error);
             }
        );
      }

  deleteFood(food) {
        if (confirm('Are you sure you want to delete ' + food.name + '?')) {
            this._demoService.deleteFood(food).subscribe(
                 data => {
                   // refresh the list
                     this.getFoods();
                   return true;
                 },
               error => {
                   console.error('Error deleting food!');
                   return Observable.throw(error);
                 }
            );
          }
      }

}
