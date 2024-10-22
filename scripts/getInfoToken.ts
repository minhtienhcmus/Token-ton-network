import { Address, toNano } from '@ton/core';
// import { CampaignFactory } from '../wrappers/CampaignFactory';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { Xoffer } from '../wrappers/Xoffer';
import { JettonMaster } from '@ton/ton';
import { JettonWallet } from '../wrappers/JettonWallet';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('jetson wallet address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const campaignFactory = provider.open(JettonWallet.createFromAddress(address));
    console.log("campaignFactory==");
    // const getOwnerAddress = await campaignFactory.getOwnerAddress();
    // console.log("getOwnerAddress==",getOwnerAddress);
    // // const getJettonAddress = await campaignFactory.getJettonAddress();
    // // console.log("getJettonAddress==",getJettonAddress);
    // const getPoolAddress = await campaignFactory.getPoolAddress();
    // console.log("getPoolAddress==",getPoolAddress);

    // const getamount = await campaignFactory.getAmount();
    // console.log("getamount==",getamount);
    let jettonWalletAddress = Address.parse("EQBs72ajelb33oqhaL21YBt9fnahcfCcompubZYQYifoM_aH");
    const jetton_wallet_address = await campaignFactory.getJettonBalance();
    console.log("jetton_wallet_address==",jetton_wallet_address);
    
    // const counterBefore = await couter.getCounter();
    // let jettonMaster_address = Address.parse("EQB_3KNt8oOR3kOA6SwtFBsHI8iIBP68eytQuwL8S1sUNGYx");
    // await campaignFactory.sendCreateCampaign(provider.sender(), {
    //     jetton_wallet_aff: jettonMaster_address,
    //     // jetton_wallet_reward: jettonMaster_address,
    //     campaign_budget: toNano(200),
    //     // amount_reward: toNano(200),
    //     // type_campaign: BigInt(62),
    //     value: toNano('0.05'),
    // });
    // ui.write('Waiting for counter to increase...');

    // let counterAfter = await couter.getCounter();
    // let attempt = 1;
    // while (counterAfter === counterBefore) {
    //     ui.setActionPrompt(`Attempt ${attempt}`);
    //     await sleep(2000);
    //     counterAfter = await couter.getCounter();
    //     attempt++;
    // }

    ui.clearActionPrompt();
    ui.write('Counter increased successfully!');
}