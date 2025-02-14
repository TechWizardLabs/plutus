'use client'

import { getPlutusProgram, getPlutusProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function usePlutusProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getPlutusProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getPlutusProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['plutus', 'all', { cluster }],
    queryFn: () => program.account.plutus.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['plutus', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ plutus: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function usePlutusProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = usePlutusProgram()

  const accountQuery = useQuery({
    queryKey: ['plutus', 'fetch', { cluster, account }],
    queryFn: () => program.account.plutus.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['plutus', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ plutus: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['plutus', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ plutus: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['plutus', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ plutus: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['plutus', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ plutus: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
