import { AppKit } from '@web3modal/base'
import type { AppKitOptions } from '@web3modal/base'
import { EVMEthers5Client, type AdapterOptions } from '@web3modal/base/adapters/evm/ethers5'
import { ConstantsUtil } from '@web3modal/scaffold-utils'
import { type Chain } from '@web3modal/scaffold-utils/ethers'

// -- Types -------------------------------------------------------------
export type { AdapterOptions } from '@web3modal/base/adapters/evm/ethers'

// -- Configs -----------------------------------------------------------
export { defaultConfig } from '@web3modal/base/adapters/evm/ethers'

// -- Setup -------------------------------------------------------------
type EthersAppKitOptions = Omit<AppKitOptions<Chain>, 'adapters' | 'sdkType' | 'sdkVersion'> &
  AdapterOptions

export function createWeb3Modal(options: EthersAppKitOptions) {
  const ethers5Adapter = new EVMEthers5Client({
    ethersConfig: options.ethersConfig,
    siweConfig: options.siweConfig,
    chains: options.chains,
    defaultChain: options.defaultChain
  })

  return new AppKit({
    ...options,
    defaultChain: ethers5Adapter.defaultChain,
    adapters: [ethers5Adapter],
    sdkType: 'w3m',
    sdkVersion: `html-ethers5-${ConstantsUtil.VERSION}`
  })
}
