import * as React from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { POOL_FACTORY_ADDRESS } from "@/utils/addresses";
import { PoolFactoryABI } from "@/utils/abis/PoolFactory";
export function MintNFT() {
  const { config } = usePrepareContractWrite({
    address: POOL_FACTORY_ADDRESS as `0x${string}`,
    abi: PoolFactoryABI,
    functionName: 'mint',
    args: [formData.to, nft.tokenId, formData.amount],
  })
  const { write } = useContractWrite(config)

  write()
}