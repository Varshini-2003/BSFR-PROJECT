// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


library Types {
    enum UserRole {

        Admin, //0
        User, //1
        Hacker //2
    }


    struct UserDetails {
        UserRole role;
        address id_;
        string name;
        string email;
    }


   
}