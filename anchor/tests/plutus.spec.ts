import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Plutus} from '../target/types/plutus'

describe('plutus', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Plutus as Program<Plutus>

  const plutusKeypair = Keypair.generate()

  it('Initialize Plutus', async () => {
    await program.methods
      .initialize()
      .accounts({
        plutus: plutusKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([plutusKeypair])
      .rpc()

    const currentCount = await program.account.plutus.fetch(plutusKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Plutus', async () => {
    await program.methods.increment().accounts({ plutus: plutusKeypair.publicKey }).rpc()

    const currentCount = await program.account.plutus.fetch(plutusKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Plutus Again', async () => {
    await program.methods.increment().accounts({ plutus: plutusKeypair.publicKey }).rpc()

    const currentCount = await program.account.plutus.fetch(plutusKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Plutus', async () => {
    await program.methods.decrement().accounts({ plutus: plutusKeypair.publicKey }).rpc()

    const currentCount = await program.account.plutus.fetch(plutusKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set plutus value', async () => {
    await program.methods.set(42).accounts({ plutus: plutusKeypair.publicKey }).rpc()

    const currentCount = await program.account.plutus.fetch(plutusKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the plutus account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        plutus: plutusKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.plutus.fetchNullable(plutusKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
