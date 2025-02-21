import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { Main } from '../build/Main/tact_Main';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(
        provider.sender().address!!
    ));

    await main.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(main.address);

    console.log('ID', main.address);
}
