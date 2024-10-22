import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { MyNewContract } from '../wrappers/MyNewContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('MyNewContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MyNewContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let myNewContract: SandboxContract<MyNewContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        myNewContract = blockchain.openContract(MyNewContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await myNewContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: myNewContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and myNewContract are ready to use
    });
});
