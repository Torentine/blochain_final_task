"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { ethers } from "ethers";
import YourContract from "~~/packages/hardhats/contracts/YourContract.sol"; 

const VOTING_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      if (!connectedAddress) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, VotingContract.abi, provider);

      const count = await contract.candidatesCount();
      const fetchedCandidates = [];

      for (let i = 1; i <= count; i++) {
        const candidate = await contract.candidates(i);
        fetchedCandidates.push(candidate);
      }

      setCandidates(fetchedCandidates);
      setLoading(false);
    };

    fetchCandidates();
  }, [connectedAddress]);

  const handleVote = async (candidateId: number) => {
    if (!connectedAddress) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, VotingContract.abi, signer);

    const tx = await contract.vote(candidateId);
    await tx.wait();
    alert(`Вы проголосовали за кандидата с ID: ${candidateId}`);
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Voting DApp</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <h2 className="text-center text-2xl mb-4">Candidates</h2>
          {loading ? (
            <p>Loading candidates...</p>
          ) : (
            <div className="flex flex-col items-center">
              {candidates.map((candidate, index) => (
                <div key={index} className="flex justify-between bg-white p-4 rounded-lg shadow-md mb-2 w-full max-w-md">
                  <p>{candidate.name}</p>
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                    onClick={() => handleVote(candidate.id)}
                  >
                    Vote
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
