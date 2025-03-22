// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Types.sol";
import "./Users.sol";  

contract RansomwareDetection is Users {

     using Types for *; 

    mapping(address => string[]) public userFiles;
    mapping(address => string) public ipfsHashes;
    mapping(address => mapping(string => bool)) public userIPFSHashes;


    constructor(string memory name_, string memory email_) {
        Types.UserDetails memory userDetails = Types.UserDetails({
            role: Types.UserRole.Admin,
            id_: msg.sender,
            name: name_,
            email: email_
        });
        add(userDetails);
    }

       function getUserDetails(address id_)
        public
        view
        returns (Types.UserDetails memory)
    {
        return getuserDetails(id_);
    }


    function addUser(Types.UserDetails memory user_) public {
        adduser(user_, msg.sender);
    }


     function storeIPFSHash(string memory ipfsHash) public onlyUser {
       // require(!userIPFSHashes[msg.sender][ipfsHash], "IPFS hash already stored for this user");
        
        userFiles[msg.sender].push(ipfsHash);
        userIPFSHashes[msg.sender][ipfsHash] = true;
    }


    function getIPFSHash(address userAddress) public view onlyUser returns (string memory) {
        return ipfsHashes[userAddress];
    }
    
    function getUserFileHashes(address userAddress) public view onlyUser returns (string[] memory) {
        return userFiles[userAddress];
    }

    function retrieveFileFromIPFS(string memory ipfsHash) public view onlyUser returns (string memory) {
        return ipfsHash;
    }


    receive() external payable {}
    
}
