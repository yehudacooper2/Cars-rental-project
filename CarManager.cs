﻿using DAL;
using BOL;
using System;
using System.Linq;

namespace BLL
{
    static public class CarManager
    {
        /// <summary>
        /// SelectAllBooks reads all the Books from the DB by the EF ref
        /// and maps the DAL objects to BOL objects
        /// </summary>
        static public CarModel[] SelectAllCars()
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    return ef.Cars.Select(dbCar => new CarModel
                    {
                     CarCurrentKilometerage = dbCar.currentKilometerage, 
                      CarImage = dbCar.image,
                      CarIsFitForRental = dbCar.isFitForRental,
                      CarNumber = dbCar.carNumber,
                      CarBranch = new BranchModel
                      {
                          BranchAddress = dbCar.Branch.address,
                          BranchLatitude = dbCar.Branch.latitude,
                          BranchLongitude = dbCar.Branch.longitude,
                          BranchName = dbCar.Branch.branchName,
                      },
                      CarType = new CarTypeModel
                      {
                       //   CarTypeId = dbCar.CarType.carTypeId,
                          DailyCost = dbCar.CarType.dailyCost,
                          DayDelayCost = dbCar.CarType.dayDelayCost,
                          Gear = dbCar.CarType.gear,
                          Manufacturer = dbCar.CarType.manufacturer,
                          ManufactureYear = dbCar.CarType.manufactureYear,
                          Model = dbCar.CarType.model,
                      }
                        }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }


        /// <summary>
        /// SelectBookByName selects a specific Book from the DB by the EF ref
        /// by the `bookName` parameter
        /// and maps the DAL object to BOL object
        /// </summary>
        static public CarModel SelectCarByCarNumber(string carNumber)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    Car selectedCar = ef.Cars.FirstOrDefault(dbCar => dbCar.carNumber == carNumber);
                    if (selectedCar == null)
                        return null;

                    return new CarModel
                    {
                        CarCurrentKilometerage = selectedCar.currentKilometerage,
                        CarImage = selectedCar.image,
                        CarIsFitForRental = selectedCar.isFitForRental,
                        CarNumber = selectedCar.carNumber,
                        CarBranch = new BranchModel
                        {
                            BranchAddress = selectedCar.Branch.address,
                            BranchLatitude = selectedCar.Branch.latitude,
                            BranchLongitude = selectedCar.Branch.longitude,
                            BranchName = selectedCar.Branch.branchName,
                        },
                        CarType = new CarTypeModel
                        {
                         //   CarTypeId = selectedCar.CarType.carTypeId,
                            DailyCost = selectedCar.CarType.dailyCost,
                            DayDelayCost = selectedCar.CarType.dayDelayCost,
                            Gear = selectedCar.CarType.gear,
                            Manufacturer = selectedCar.CarType.manufacturer,
                            ManufactureYear = selectedCar.CarType.manufactureYear,
                            Model = selectedCar.CarType.model,
                        }
                    };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }



        /// <summary>
        /// InsertBook inserts a new Book to the DB by the EF ref
        /// maps the `newBook` parameter (BOL object) to a `Book` (DAL object)
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool InsertCar(CarModel newCar)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {
                    Branch selectedBranch = ef.Branches.FirstOrDefault(dbBranch => dbBranch.branchName == newCar.CarBranch.BranchName);
                    if (selectedBranch == null)
                        return false;

                    CarType selectedCarType = ef.CarTypes.FirstOrDefault(dbCarType => dbCarType.model == newCar.CarType.Model);
                    if (selectedCarType == null)
                        return false;

                    Car newDbCar = new Car
                    {
                        currentKilometerage = newCar.CarCurrentKilometerage,
                        image = newCar.CarImage,
                        isFitForRental = newCar.CarIsFitForRental,
                        carNumber = newCar.CarNumber,
                        branchId = selectedBranch.BranchId,
                        carTypeId = selectedCarType.carTypeId,
                    };

                    ef.Cars.Add(newDbCar);
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }



        /// <summary>
        /// UpdateBookByName updates a specific Book from the DB by the EF ref
        /// by the `bookName` parameter
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool UpdateCarByCarNumber(string carNumber, CarModel newCar)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    Car selectedCar = ef.Cars.FirstOrDefault(dbCar => dbCar.carNumber == carNumber);
                    if (selectedCar == null)
                        return false;

                    selectedCar.carNumber = newCar.CarNumber;
                    selectedCar.currentKilometerage = newCar.CarCurrentKilometerage;
                    selectedCar.image = newCar.CarImage;
                    selectedCar.isFitForRental = newCar.CarIsFitForRental;

                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        /// <summary>
        /// DeleteBookByName deletes a specific Book from the DB by the EF ref
        /// by the `bookName` parameter
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool DeleteCarByCarNumber(string carNumber)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    Car selectedCar = ef.Cars.FirstOrDefault(dbCar => dbCar.carNumber == carNumber);
                    if (selectedCar == null)
                        return false;

                    ef.Cars.Remove(selectedCar);
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
