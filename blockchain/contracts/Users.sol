// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Types.sol";

contract Users{

    mapping(address => Types.UserDetails) internal users;
    mapping(address => Types.UserDetails[]) internal AdminUsersList;
    mapping(address => Types.UserDetails[]) internal AdminHackersList;
    

     function add(Types.UserDetails memory user) internal {
        require(user.id_ != address(0));
        require(!has(user.role, user.id_), "Same user with same role exists");
        users[user.id_] = user;
    }

     function has(Types.UserRole role, address account)
        internal
        view
        returns (bool)
    {
        require(account != address(0));
        return (users[account].id_ != address(0) &&
            users[account].role == role);
    }

    function getuserDetails(address id_)
        internal
        view
        returns (Types.UserDetails memory)
    {
        require(id_ != address(0));
        require(get(id_).id_ != address(0));
        return get(id_);
        
    }


    function adduser(Types.UserDetails memory user, address myAccount) internal {
            
            require(myAccount != address(0));
            require(user.id_ != address(0));

           
            Types.UserRole callerRole = get(myAccount).role;

           
            if (callerRole == Types.UserRole.Admin) {
                if (
                    user.role == Types.UserRole.User ||
                    user.role == Types.UserRole.Hacker 
                    ) {

                // Add user to the appropriate list based on their role
                if (user.role == Types.UserRole.User) {
                    
                    AdminUsersList[myAccount].push(user);       
                
                } else if (user.role == Types.UserRole.Hacker) {
                    
                    AdminHackersList[myAccount].push(user);   
                
                } 

                // Add user to global list
                add(user);

                } else {
                    revert("Invalid role for Admin");
                }
            } else {
                revert("Only Admin can perform this operation");
            }
        }

        
        function get(address account)
            internal
            view
        returns (Types.UserDetails memory)
        {
            require(account != address(0));
            return users[account];
        }


        modifier onlyUser() {
             require(users[msg.sender].role == Types.UserRole.User, "Only users can call this function");
            _;
        }
    
}