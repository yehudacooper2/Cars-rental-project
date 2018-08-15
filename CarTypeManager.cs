using DAL;
using BOL;
using System;
using System.Linq;

namespace BLL
{
    static public class CarTypeManager
    {
        /// <summary>
        /// SelectAllAuthors reads all the Authors from the DB by the EF ref
        /// and maps the DAL objects to BOL objects
        /// </summary>
        static public CarTypeModel[] SelectAllCarTypes()
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    return ef.CarTypes.Select(dbUser => new CarTypeModel
                    {
                    //    CarTypeId = dbUser.carTypeId,
                        Manufacturer = dbUser.manufacturer,
                        Model = dbUser.model,
                        DailyCost = dbUser.dailyCost,
                        DayDelayCost = dbUser.dayDelayCost,
                        ManufactureYear = dbUser.manufactureYear,
                        Gear = dbUser.gear,

                    }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }




        /// <summary>
        /// SelectAuthorByName selects a specific Author from the DB by the EF ref
        /// by the `authorName` parameter
        /// and maps the DAL object to BOL object
        /// </summary>
        static public CarTypeModel SelectCarTypeByModel(string carModel)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    CarType selectedCarType = ef.CarTypes.FirstOrDefault(dbCarType => dbCarType.model == carModel);
                    if (selectedCarType == null)
                        return null;

                    return new CarTypeModel
                    {
                      //  CarTypeId = selectedCarType.carTypeId,
                        Manufacturer = selectedCarType.manufacturer,
                        Model = selectedCarType.model,
                        DailyCost = selectedCarType.dailyCost,
                        DayDelayCost = selectedCarType.dayDelayCost,
                        ManufactureYear = selectedCarType.manufactureYear,
                        Gear = selectedCarType.gear,

                    };

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// InsertAuthor inserts a new Author to the DB by the EF ref
        /// maps the `newAuthor` parameter (BOL object) to a `Author` (DAL object)
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool InsertCarType(CarTypeModel newCarType)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {
                    CarType newDbCarType = new CarType
                    {
                     //   carTypeId = newCarType.CarTypeId,
                        manufacturer = newCarType.Manufacturer,
                        model = newCarType.Model,
                        dailyCost = newCarType.DailyCost,
                        dayDelayCost = newCarType.DayDelayCost,
                        manufactureYear = newCarType.ManufactureYear,
                        gear = newCarType.Gear,
                    };

                    ef.CarTypes.Add(newDbCarType);
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
        /// UpdateAuthorByName updates a specific Author from the DB by the EF ref
        /// by the `authorName` parameter
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool UpdateCarTypeByModel(string carModel, CarTypeModel newCarType)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    CarType selectedCarType = ef.CarTypes.FirstOrDefault(dbCarType => dbCarType.model == carModel);
                    if (selectedCarType == null)
                        return false;

                  //  selectedCarType.carTypeId = newCarType.CarTypeId;
                    selectedCarType.manufacturer = newCarType.Manufacturer;
                    selectedCarType.model = newCarType.Model;
                    selectedCarType.dailyCost = newCarType.DailyCost;
                    selectedCarType.dayDelayCost = newCarType.DayDelayCost;
                    selectedCarType.manufactureYear = newCarType.ManufactureYear;
                    selectedCarType.gear = newCarType.Gear;

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
        /// DeleteAuthorByName delete a specific Author from the DB by the EF ref
        /// by the `authorName` parameter
        /// and returns bool value - if the action was success
        /// </summary>
        static public bool DeleteCarTypeByModel(string carModel)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    CarType selectedCarType = ef.CarTypes.FirstOrDefault(dbCarType => dbCarType.model == carModel);
                    if (selectedCarType == null)
                        return false;

                    ef.CarTypes.Remove(selectedCarType);
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
