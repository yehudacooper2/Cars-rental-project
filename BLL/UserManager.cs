﻿using DAL;
using BOL;
using System;
using System.Linq;

namespace BLL
{
    static public class UserManager
    {
        /// <summary>
        /// SelectAllAuthors reads all the Authors from the DB by the EF ref
        /// and maps the DAL objects to BOL objects
        /// </summary>
        static public UserModel[] SelectAllUsers()
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    return ef.Users.Select(dbUser => new UserModel
                    {
                        UserName = dbUser.userName,
                        UserFullName = dbUser.fullName,
                        UserIdentityNumber = dbUser.identityNumber,
                        UserBirthDay = dbUser.birthDay,
                        UserGender = dbUser.gender,
                        UserEmail = dbUser.email,
                        UserPassword = dbUser.password,
                        UserRole = dbUser.userRole,
                        UserImage = dbUser.image,
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
        static public UserModel SelectUserByName(string userName)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.userName == userName);
                    if (selectedUser == null)
                        return null;

                    return new UserModel
                    {
                        UserName = selectedUser.userName,
                        UserFullName = selectedUser.fullName,
                        UserIdentityNumber = selectedUser.identityNumber,
                        UserBirthDay = selectedUser.birthDay,
                        UserGender = selectedUser.gender,
                        UserEmail = selectedUser.email,
                        UserPassword = selectedUser.password,
                        UserRole = selectedUser.userRole,
                        UserImage = selectedUser.image,
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
        static public bool InsertUser(UserModel newUser)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {
                    User newDbUser = new User
                    {
                        userName = newUser.UserName,
                        fullName = newUser.UserFullName,
                        identityNumber = newUser.UserIdentityNumber,
                        birthDay = newUser.UserBirthDay,
                        gender = newUser.UserGender,
                        email =  newUser.UserPassword,
                        userRole = newUser.UserRole,
                        password = newUser.UserPassword,
                        image = newUser.UserImage,
                    };

                    ef.Users.Add(newDbUser);
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
        static public bool UpdateUserByName(string userName, UserModel newUser)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.userName == userName);
                    if (selectedUser == null)
                        return false;

                    selectedUser.userName = newUser.UserName;
                    selectedUser.fullName = newUser.UserFullName;
                    selectedUser.identityNumber = newUser.UserIdentityNumber;
                    selectedUser.birthDay = newUser.UserBirthDay;
                    selectedUser.gender = newUser.UserGender;
                    selectedUser.email = newUser.UserEmail;
                    selectedUser.password = newUser.UserPassword;
                    selectedUser.userRole = newUser.UserRole;
                    selectedUser.image = newUser.UserImage;

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
        static public bool DeleteUserByName(string userName)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {

                    User selectedUser = ef.Users.FirstOrDefault(dbUser => dbUser.userName == userName);
                    if (selectedUser == null)
                        return false;

                    ef.Users.Remove(selectedUser);
                    ef.SaveChanges();
                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static UserModel GetUser(string name, string password)
        {
            try
            {
                using (CarsRentalEntities ef = new CarsRentalEntities())
                {
                    User dbUser = ef.Users.FirstOrDefault(u => u.userName == name && u.password == password);
                    if (dbUser != null)
                    {
                        UserModel user = new UserModel
                        {
                            UserName = dbUser.userName,
                            UserRole = dbUser.userRole,
                        };
                        return user;
                    }

                }

            }
            catch (Exception) { }
            return null;
        }
    }
}
