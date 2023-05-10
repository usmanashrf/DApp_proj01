"use client";

import React, { useMemo, useState } from 'react'
import { getZeroDevSigner, getSocialWalletOwner, ZeroDevSigner } from '@zerodevapp/sdk'
import {
  SocialWallet,
} from '@zerodevapp/social-wallet';


declare global {
  interface Window {
    ethereum: any;
  }
}

function Home() {

  const [address, setAddress] = useState<string>()
  const [loading, setLoading] = useState(false)


  console.log("user ", address)


  const socialWallet = useMemo(() => {
    return new SocialWallet()
  }, [])


  const createWallet = async () => {

    try {

      setLoading(true)

      const signer = await getZeroDevSigner({
        projectId: '347b3ab7-136c-4df0-a106-c876593e0a80',
        owner: await getSocialWalletOwner('347b3ab7-136c-4df0-a106-c876593e0a80', socialWallet)
      })


      const userAddress = await signer.getAddress();

      const balance= await signer.getBalance();
      console.log("balacne: "+balance);
      console.log(await signer.resolveName.name);
      setAddress(userAddress)

    }
    catch (e) {

      console.log(e)
    }
    finally {
      setLoading(false)
    }

  }


  const disconnect = async () => {
    await socialWallet.disconnect();
    setAddress(undefined)


  }


  return (
    <div>

      <div>
        {!address && <button className='bg-gray-300 p-3' onClick={createWallet} disabled={loading}>{loading ? 'loading...' : 'Connect Wallet'}</button>}
        {!!address &&
          <button className='bg-gray-300 p-3' onClick={disconnect} disabled={loading}>Disconnect</button>
        }
      </div>
      {!!address &&
        <div>
          <label> {`${address}`}</label>
        </div>
      }
    </div>
  )
}

export default Home