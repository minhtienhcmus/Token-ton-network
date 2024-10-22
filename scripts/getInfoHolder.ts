import { Address, toNano } from '@ton/core';
// import { CampaignFactory } from '../wrappers/CampaignFactory';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { Xoffer } from '../wrappers/Xoffer';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('minner jetton address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const campaignFactory = provider.open(Xoffer.createFromAddress(address));
    console.log("campaignFactory==");
    // const getOwnerAddress = await campaignFactory.getOwnerAddress();
    // console.log("getOwnerAddress==",getOwnerAddress);
    // // const getJettonAddress = await campaignFactory.getJettonAddress();
    // // console.log("getJettonAddress==",getJettonAddress);
    // const getPoolAddress = await campaignFactory.getPoolAddress();
    // console.log("getPoolAddress==",getPoolAddress);

    // const getamount = await campaignFactory.getAmount();
    // console.log("getamount==",getamount);
    // let owner_address = Address.parse("0QDE0iKpkaZl5-ZpkluwHRNm9ffUnVN-EllkIm61zqoMX660");
    // const get_jetton_data = await campaignFactory.getJettonData();
    // console.log("get_jetton_data==",get_jetton_data);
    const owner_address = Address.parse(args.length > 0 ? args[0] : await ui.input('wallet address'));
    // let owner_address = Address.parse("0QDE0iKpkaZl5-ZpkluwHRNm9ffUnVN-EllkIm61zqoMX660");
    const jetton_wallet_address = await campaignFactory.getWalletAddress(owner_address);
    console.log("owner_address==",jetton_wallet_address);
    
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