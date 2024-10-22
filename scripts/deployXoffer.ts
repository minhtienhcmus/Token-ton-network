import { toNano } from '@ton/core';
import { jettonContentToCell, Xoffer } from '../wrappers/Xoffer';
import { compile, NetworkProvider } from '@ton/blueprint';
import { promptAddress, promptBool, promptUrl } from '../wrappers/ ui-utils';
const formatUrl = "https://github.com/ton-blockchain/TEPs/blob/master/text/0064-token-data-standard.md#jetton-metadata-example-offchain";
const exampleContent = {
                          "name": "Sample Jetton",
                          "description": "Sample of Jetton",
                          "symbol": "JTN",
                          "decimals": 9,
                          "image": "https://www.svgrepo.com/download/483336/coin-vector.svg"
                       };
const urlPrompt = 'https://unicorn-nft-bucket.s3.amazonaws.com/meta.json';
export async function run(provider: NetworkProvider) {
    const ui       = provider.ui();
    const sender   = provider.sender();
    const adminPrompt = `UQCQOurVXARJMr-nTDVS34MFxLVC9onE4YV9d0s8xTCfGLXn`;
    ui.write(`Jetton deployer\nCurrent deployer onli supports off-chain format:${formatUrl}`);
    let admin      = await promptAddress(adminPrompt, ui, sender.address);
    ui.write(`Admin address:${admin}\n`);
    let contentUrl = await promptUrl(urlPrompt, ui);
    ui.write(`Jetton content url:${contentUrl}`);

    let dataCorrect = false;
    do {
        ui.write("Please verify data:\n")
        ui.write(`Admin:${admin}\n\n`);
        ui.write('Metadata url:' + contentUrl);
        dataCorrect = await promptBool('Is everything ok?(y/n)', ['y','n'], ui);
        if(!dataCorrect) {
            const upd = await ui.choose('What do you want to update?', ['Admin', 'Url'], (c) => c);

            if(upd == 'Admin') {
                admin = await promptAddress(adminPrompt, ui, sender.address);
            }
            else {
                contentUrl = await promptUrl(urlPrompt, ui);
            }
        }

    } while(!dataCorrect);
    const content = jettonContentToCell({type:1,uri:contentUrl});
    const wallet_code = await compile('JettonWallet');
    const xoffer = provider.open(Xoffer.createFromConfig({
        total_supply: 0,
        admin: admin,
        content: content,
        wallet_code: wallet_code
    }, await compile('Xoffer')));

    await xoffer.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(xoffer.address);

    // run methods on `xoffer`
}
