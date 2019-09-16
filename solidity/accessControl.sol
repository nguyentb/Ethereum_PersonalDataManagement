pragma solidity >=0.4.2;

contract AccessControl {

    // Record of a user's data (ETH address => fileID)
    mapping(address => bytes32[]) private myData;
    // Record of file IDs and their associated content owner (the users) (file ID => ETH address)
    mapping(bytes32 => address) private ownership;
    // Record of file IDs and who can access the data (file ID => ETH address => bool)
    mapping(bytes32 => mapping(address => bool)) private canAccess;
    //Record of tokens (fileID => owner => token)
    mapping(bytes32 => mapping(address => bytes32)) private tokens;
    // Record of token expiration times (token => time)
    mapping(bytes32 => uint256) private expiration;

    // IPFS address of map from file IDs to IPFS addresses
    string private mapAddress = "Qmdcdys5PNRvhDwBZMcKTsbjQMhfeGC4ZbhJsjeJcsYYZj";


    // ---------- ADDING DATA ----------

    // Register file ID to add in order to receive map address
    function getMapAddress() public view returns (string memory){
        return mapAddress;
    }

    // Add previously registered user data and update the map address (for users)
    function userAddData(bytes32 _fileID, string memory _mapAddress) public {
        ownership[_fileID] = msg.sender;
        canAccess[_fileID][msg.sender] = true;
        myData[msg.sender].push(_fileID);
        mapAddress = _mapAddress;
    }

    // Add previously registered user data and update the map address (for service providers)
    function spAddData(bytes32 _fileID, address _userAddress, string memory _mapAddress) public {
        ownership[_fileID] = _userAddress;
        canAccess[_fileID][msg.sender] = true;
        canAccess[_fileID][_userAddress] = true;
        myData[_userAddress].push(_fileID);
        mapAddress = _mapAddress;
    }


    // ------------ ACCESS CONTROL ------------

    // User grants access to its data
    function grantAccess(bytes32 _fileID, address _thirdParty) public {
        require(msg.sender == ownership[_fileID]);
        canAccess[_fileID][_thirdParty] = true;
    }

    // User revokes access to its data
    function revokeAccess(bytes32 _fileID, address thirdParty) public {
        require(msg.sender == ownership[_fileID]);
        canAccess[_fileID][thirdParty] = false;
    }


    // ------------- ACCESS TOKENS -------------

    // Pseudo random number generator
    function random(bytes32 _fileID) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, _fileID));
    }

    // Generate access token to a specified file
    function getToken(bytes32 _fileID) public {
        require (canAccess[_fileID][msg.sender]);
        bytes32 token = random(_fileID);
        expiration[token] = block.timestamp + 5*60; // tokens last 5 minutes
        tokens[_fileID][msg.sender] = token;
    }

    function getTokenCall(bytes32 _fileID) public view returns(bytes32){
        require(tokens[_fileID][msg.sender] != 0x0);
        bytes32 token = tokens[_fileID][msg.sender];
        return token;
    }

    // Use token to have access to the map address
    function validateToken(bytes32 _token, bytes32 _fileID) public returns(string memory){
        require (block.timestamp < expiration[_token]);
        require (tokens[_fileID][msg.sender] == _token);
        expiration[_token] = 0;
        tokens[_fileID][msg.sender] = 0x0;
        return mapAddress;
    }


    // ----------------- VIEW -----------------

    // User asks for a view of all its data in the system
    function getMyData() public view returns (bytes32[] memory){
        return myData[msg.sender];
    }

    // Get user's data
    function getUserData(address _userAddress) public view returns (bytes32[] memory){
        return myData[_userAddress];
    }
}
