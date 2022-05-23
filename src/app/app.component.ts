import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public cars?: Car[];
  public filteredResults: Car[] = [];
  public criteria: (string)[] = [];
  public title = 'CarApp';
  public features = new FormGroup({
    colorRed: new FormControl(false),
    colorWhite: new FormControl(false),
    colorGray: new FormControl(false),
    colorSilver: new FormControl(false),
    colorBlack: new FormControl(false),
    hasSunRoof: new FormControl(false),
    isFourWheelDrive: new FormControl(false),
    hasLowMiles: new FormControl(false),
    hasPowerWindows: new FormControl(false),
    hasNavigation: new FormControl(false),
    hasHeatedSeats: new FormControl(false)
  });

  constructor(http: HttpClient) {
    http.get<Car[]>('https://localhost:7084/Car').subscribe(result => {
      this.cars = result;
    }, error => console.error(error));
  }

  getCriteria() {

    this.filteredResults.length = 0;
    this.criteria.length = 0;

    Object.keys(this.features.controls).forEach(key => {
      if (this.features.controls[key].value) {
        this.criteria.push(key);
      };
    }); 
  }

  handleAny() { 
 
    let resultSet = JSON.parse(JSON.stringify(this.cars));

    for (let i = 0; i < this.criteria.length; i++) {
      for (let j = 0; j < resultSet.length; j++) {

        if (this.criteria[i].startsWith("color")) {
          let actualColor = this.criteria[i].replace("color", "");
          if (resultSet[j].color === actualColor) {
            this.filteredResults.push(resultSet[j]);
            resultSet.splice(j, 1);
            j--;
          }
        }
        else if (resultSet[j][this.criteria[i]]) { 
          this.filteredResults.push(resultSet[j]);
          resultSet.splice(j, 1);
          j--;
        }
      }
    }
  }

  handleAll() {

    let resultSet = JSON.parse(JSON.stringify(this.cars));

    for (let i = 0; i < resultSet.length; i++) {
      for (let j = 0; j < this.criteria.length; j++) {

        if (this.criteria[j].startsWith("color")) {
          let actualColor = this.criteria[j].replace("color", "");
          if (resultSet[i].color !== actualColor) {
            break;
          }
        }
        else if (resultSet[i][this.criteria[j]] !== true){
          break;
        }

        if (j === (this.criteria.length - 1)) {
          this.filteredResults.push(resultSet[i]);
        }
      }
    }
  }

}

interface Car {
  carId: string;
  make: string;
  year: number;
  color: string;
  price: number;
  hasSunroof: boolean;
  isFourWheelDrive: boolean;
  hasLowMiles: boolean;
  hasPowerWindows: boolean;
  hasNavigation: boolean;
  hasHeatedSeats: boolean;

}
