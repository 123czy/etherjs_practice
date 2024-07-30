'use client';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';


import ButtonLink from '@/components/links/ButtonLink';
import {useEffect,useState} from 'react'
import { ethers } from "ethers";


interface Mnemonic {
  phrase: string;
  // 如果还有其他属性，也在这里定义它们
}
export default  function WalletPage() {
  const ALCHEMY_MAINNET_URL = 'https://rpc.ankr.com/eth';
  const ALCHEMY_SEPOLIA_URL = 'https://rpc.sepolia.org';
  // 连接以太坊主网
  const providerETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
  // 连接Sepolia测试网
  const providerSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL)
  const INFURA_ID = '6efa0cdff30645acab0adc1599153f41'
  const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)
  // 创建随机的wallet对象
  const wallet1 = ethers.Wallet.createRandom()
  const wallet1WithProvider = wallet1.connect(provider)
  // 利用私钥和provider创建wallet对象
  const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
  const wallet2 = new ethers.Wallet(privateKey, provider)

  const mnemonic = wallet1.mnemonic
    const [ethNumber,setEthNumber] = useState<number>(0)
    const [count,setCount] = useState<number>(0)
    const [mnemonic2,setMnemonic2] = useState<Mnemonic | undefined | null>(undefined)
    const [wallet,setWallet] = useState<string | undefined>(undefined)
    const [address2,setAddress2] = useState<string | undefined>(undefined)
    const [txcount1,setTxcount1] = useState<number>(0)
    const [txcount2,setTxcount2] = useState<number>(0)
    useEffect(() => {
      (async () => {
        const balance = await provider.getBalance(`vitalik.eth`);
        const txCount = await providerETH.getTransactionCount("vitalik.eth");
        const balance2 = await providerETH.getBalance(`vitalik.eth`);
        const balanceSepolia = await providerSepolia.getBalance(`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`);
        const num = Number(ethers.formatEther(balance))
        const address2 = await wallet2.getAddress()
        const Count1 = await provider.getTransactionCount(wallet1WithProvider)
        const Count2 = await provider.getTransactionCount(wallet2)
        setTxcount1(Count1)
        setTxcount2(Count2)
         setEthNumber(num)
        setCount(txCount)
        // 获取助记词
       setWallet(wallet1.address)
       setMnemonic2(mnemonic)
       setAddress2(address2)
       console.log(`i. 发送前余额`)
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
    // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
        to: wallet,
        value: ethers.parseEther("0.001")
    }
    // iii. 发送交易，获得收据
    console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
    const receipt = await wallet2.sendTransaction(tx)
    await receipt.wait() // 等待链上确认交易
    console.log(receipt) // 打印交易详情
    // iv. 打印交易后余额
    console.log(`\niii. 发送后余额`)
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
      })();
     }, []);
return (
  <main>
      <section className='bg-white flex min-h-screen flex-col items-center justify-center py-12 text-center'>
        <div className='text-red-500 text-sm'>
          <div className='mb-4 text-red-500'>
            <h2 className='text-2xl '>ETH Balance of vitalik: {ethNumber} ETH</h2>
            <h2 className='underline'>transition count of vitalik: {count}</h2>
            <h2 className='text-yellow-500'>current wallet1 adress: {wallet}</h2>
            <h2 className='text-yellow-500'>current wallet2 adress: {address2}</h2>
            <h2 className='text-yellow-500'>current wallet1 transition count: {txcount1}</h2>
            <h2 className='text-yellow-500'>current wallet2 transition count: {txcount2}</h2>
            <h2 className='text-blue-500'>current mnemonic of wallet: {mnemonic2?.phrase}</h2>
           </div>
        </div>
      </section>
  </main>
)
}