// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract VotingContract {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Vote {
        address voter;
        uint candidateId;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    mapping(uint => Vote) public votes;
    
    uint public candidatesCount;
    uint public totalVotes;

    address public immutable owner;

    // Events
    event CandidateAdded(uint indexed candidateId, string name);
    event Voted(address indexed voter, uint indexed candidateId);

    constructor() {
        owner = msg.sender;
    }

    // Modifier to check if the sender is the owner
    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    // Function to add candidates
    function addCandidate(string memory _name) public isOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }

    // Function to vote for a candidate
    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVotes++;
        
        emit Voted(msg.sender, _candidateId);
    }

    // Function to get the results
    function getResults() public view returns (uint[] memory) {
        uint[] memory results = new uint[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            results[i - 1] = candidates[i].voteCount;
        }
        return results;
    }
}