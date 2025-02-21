import { Main } from '../build/Main/tact_Main';
import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { randomAddress } from '@ton/test-utils';
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
    await main.send(
        provider.sender(),
        {
            value: toNano('0.05')
        },
        {
            $$type: 'CreateOrder',
            order: {
                $$type: 'Order',
                active: false,
                id: 1n,
                is_buy: false,
                user_id: randomAddress(),
                amount: 100n,
                price: 100n,
                base_token: 39n,
                quote_token: 49n
            }
        }
    )
    const list = await main.getList(
        39n, 49n, false
    )
    console.log("=>(addOrder.ts:44) list", list);
}
