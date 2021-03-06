import {
  initializeGoogleMapsPlacesService,
  initializeGoogleMapsAutocompleteService,
} from './index';
import { GooglePrediction } from '../interfaces';

export const searchCityByName = (
  searchParams: any,
): Promise<GooglePrediction[]> => {
  const service = initializeGoogleMapsPlacesService('g-map');

  return new Promise((resolve, reject) => {
    service.textSearch(searchParams, (predictions: GooglePrediction[]) => {
      if (predictions.length) {
        const isCity = predictions.find(
          (prediction: GooglePrediction) =>
            prediction.types.indexOf('locality') >= 0,
        );
        if (isCity) {
          resolve(predictions);
        } else {
          reject('Непохоже что это город, выберите другой');
        }
      } else {
        reject('Похоже такого города не существует, выберите другой');
      }
    });
  });
};

export const searchCityByFirstLetter = (
  searchParams: any,
): Promise<GooglePrediction[]> => {
  const service = initializeGoogleMapsAutocompleteService();

  return new Promise((resolve, reject) => {
    service.getPlacePredictions(
      searchParams,
      (predictions: GooglePrediction[]) => {
        if (predictions.length) {
          resolve(predictions);
        } else {
          reject(
            'Кажется, у компьютера закончились варианты. Похоже, что вы победили.',
          );
        }
      },
    );
  });
};
