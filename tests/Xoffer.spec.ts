import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Xoffer } from '../wrappers/Xoffer';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Xoffer', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Xoffer');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let xoffer: SandboxContract<Xoffer>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        xoffer = blockchain.openContract(Xoffer.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await xoffer.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: xoffer.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and xoffer are ready to use
    });
});
