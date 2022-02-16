import { Injectable } from '@angular/core';
// this function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';
import QRCodeModal from "@walletconnect/qrcode-modal";


declare global {
  interface Window {
    Web3: any;
    aWeb3: any;
    WalletConnectProvider: any;
  }
}
@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  Web3WalletConnect: any;
  Web3: any;

  constructor() {
    // console.log('QRCodeModal ::  ==>' , QRCodeModal);
  }

  async checkMetaMaskLocallyInstalled() {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    // console.log('provider :: service ==>', provider);
    if (provider) {
      return true;
    }
    return false;
  }

  getEthereum() {
    return window.ethereum;
  }

  // async getWeb3WalletConnect() {
  //   // Create a connector
  //   const provider = new window.WalletConnectProvider({
  //     infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  //   });
  //   //  Enable session (triggers QR Code modal)
  //   await provider.enable();
  //   console.log('connector.connected ::  ==>' , provider.connected);
  // }

  async getWeb3() {
    try {
        if (this.Web3) {
          return this.Web3;
        }

        const provider = await detectEthereumProvider({ mustBeMetaMask: true });
        if (provider) {
          this.Web3 = new window.Web3(provider);
          // window.aWeb3 = this.web3;
          return this.Web3;
        }
        console.log('call');
        return false;
      
    } catch (error) {
      console.log('error while getting web3 ', error);
      return false;
    }
  }
}
