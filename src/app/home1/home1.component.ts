import { Component, OnInit } from '@angular/core';
import MetaMaskOnboarding from '@metamask/onboarding';
import detectEthereumProvider from '@metamask/detect-provider';
import { Router } from '@angular/router';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.scss'],
})
export class Home1Component implements OnInit {
  provider: any;
  onboarding = new MetaMaskOnboarding();
  selectedAdd: any;

  web3: any;

  constructor(private web3service: Web3Service, private router: Router) {}

  async ngOnInit() {
    console.log('on init ==>');
    // this.web3service.checkMetaMaskLocallyInstalled().then(async res => {
    //   this.provider = res;
    // });
    const provider = await detectEthereumProvider();
    this.provider = provider;
    console.log('provider ::  ==>', provider);
    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      this.startApp(provider); // initialize your app
    } else {
      console.log('Please install MetaMask!');
      alert('Please install MetaMask!');
    }
  }

  startApp(provider: any) {
    console.log('provider :: start app ==>', provider, provider.isConnected());
    provider._metamask.isUnlocked().then((result: boolean) => {
      if (result) {
        this.connect(provider);
      }
    });
    provider.on('accountsChanged', (accounts: string[]) => {
      console.log('accounts ::  ==>', accounts);

      // let sign;
      // let decryptedAdd;
      // console.log('sign 1st ===================================>');
      // this.web3 = new window.Web3(provider);
      // this.web3.eth.personal
      //   .sign(
      //     'Please sign this message to connect to Akemona.',
      //     accounts[0],
      //     ''
      //   )
      //   .then(async (signature: any) => {
      //     sign = await signature;
      //     decryptedAdd = await this.web3.eth.personal.ecRecover(
      //       'Please sign this message to connect to Akemona.',
      //       sign
      //     );
      //     if (accounts[0].toLowerCase() === decryptedAdd) {
            this.selectedAdd = accounts[0];
            this.redirectToNextPage();
        //   }
        // })
        // .catch((err: any) => {
        //   console.log('err :: Error occured while signing ==>', err);
        //   // this.getEthereum().selectedAddress = null;
        // });
    });
  }

  redirectToNextPage() {
    // if (this.selectedAdd === '0x28715fdb4fa0d5b59da1de3911605b99622102f4') {
    //   console.log('redirect to the next route ==>');
    //   this.router.navigate(['/home']);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }

  connect(provider: any) {
    provider
      .enable()
      .then((addresses: string[]) => {
        console.log('addresses :: enable method ==>', addresses);
      })
      .catch((err: any) => {
        console.log('error ==>', err);
      });
  }

  getEthereum() {
    // return this.web3service.getEthereum();
    return window.ethereum;
  }

  installMetaMask() {
    this.onboarding.startOnboarding();
  }

  connectMetaMask() {
    // this.web3service.getWeb3WalletConnect();
  }

  async disconnect() {
    await this.provider.close();
  }
}
