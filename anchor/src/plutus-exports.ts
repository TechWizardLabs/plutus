// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import PlutusIDL from '../target/idl/plutus.json'
import type { Plutus } from '../target/types/plutus'

// Re-export the generated IDL and type
export { Plutus, PlutusIDL }

// The programId is imported from the program IDL.
export const PLUTUS_PROGRAM_ID = new PublicKey(PlutusIDL.address)

// This is a helper function to get the Plutus Anchor program.
export function getPlutusProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...PlutusIDL, address: address ? address.toBase58() : PlutusIDL.address } as Plutus, provider)
}

// This is a helper function to get the program ID for the Plutus program depending on the cluster.
export function getPlutusProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Plutus program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return PLUTUS_PROGRAM_ID
  }
}
