import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { fromNano, toNano } from '@ton/core';
import { loadMatchEvent, Main } from '../wrappers/Main';
import '@ton/test-utils';

describe('Main', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let mainContract: SandboxContract<Main>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployer = await blockchain.treasury('deployer');
        mainContract = blockchain.openContract(await Main.fromInit(deployer.address));


        const deployResult = await mainContract.send(
            deployer.getSender(),
            {
                value: toNano('0.5')
            },
            {
                $$type: 'Deploy',
                queryId: 0n
            }
        );
        await deployer.send(
            {
                value: toNano('30'),
                to: mainContract.address
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: mainContract.address,
            deploy: true
        });
    });

    it('should deploy', async () => {
    });

    describe('Create Order', () => {
        it('should not exceed limits of orders max amount', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano(0.5)
                },
                {
                    $$type: 'ChangeOrderCount',
                    new_max_count: 1n
                }
            );
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_paired: false,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.55')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 2n,
                        is_paired: false,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );
            expect(response.transactions).toHaveTransaction({
                success: false,
                from: deployer.address,
                to: mainContract.address,
                value: toNano(0.55),
                exitCode: 18022
            });
        });
        it('should not create two orders with same id', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_paired: false,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.55')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_paired: false,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );
            expect(response.transactions).toHaveTransaction({
                success: false,
                from: deployer.address,
                to: mainContract.address,
                value: toNano(0.55),
                exitCode: 34536
            });
        });
        it('should add order', async () => {
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_paired: false,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );
            expect(response.transactions).toHaveTransaction({
                from: deployer.address,
                to: mainContract.address,
                success: true
            });
            const order = await mainContract.getOrder(1n);
            expect(order).toBeDefined();
            expect(order?.id).toBe(1n);
        });
    });
    describe('Remove Order', () => {
        it('should remove order when called by owner', async () => {
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        timestamp: BigInt(Date.now()),
                        is_paired: false,
                        $$type: 'Order',
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );
            const addedOrder = await mainContract.getOrder(1n);
            expect(addedOrder).toBeDefined();
            expect(addedOrder?.id).toBe(1n);
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'RemoveOrder',
                    order_id: 1n
                }
            );
            const order = await mainContract.getOrder(1n);
            expect(order).toBeNull();
        });
        it('should remove order from user if called by owner', async () => {
            const user = await blockchain.treasury('user');
            await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        timestamp: BigInt(Date.now()),
                        $$type: 'Order',
                        id: 1n,
                        is_paired: false,
                        is_buy: false,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );

            const addedOrder = await mainContract.getOrder(1n);
            expect(addedOrder).toBeDefined();
            expect(addedOrder?.id).toBe(1n);
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'RemoveOrder',
                    order_id: 1n
                }
            );
            expect(response.transactions).toHaveTransaction({
                success: true,
                to: mainContract.address,
                from: deployer.address
            });
            const order = await mainContract.getOrder(1n);
            expect(order).toBeNull();
        });
        it('should remove order when called by order creator', async () => {
            const user = await blockchain.treasury('user');
            await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_paired: false,
                        is_buy: false,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );

            const addedOrder = await mainContract.getOrder(1n);
            expect(addedOrder).toBeDefined();
            expect(addedOrder?.id).toBe(1n);
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'RemoveOrder',
                    order_id: 1n
                }
            );
            expect(response.transactions).toHaveTransaction({
                success: true,
                to: mainContract.address,
                from: user.address
            });
            const order = await mainContract.getOrder(1n);
            expect(order).toBeNull();
        });
        it('should not remove order when called by random user', async () => {
            const user = await blockchain.treasury('user');
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const addedOrder = await mainContract.getOrder(1n);
            expect(addedOrder).toBeDefined();
            expect(addedOrder?.id).toBe(1n);
            await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'RemoveOrder',
                    order_id: 1n
                }
            );

        });
    });
    describe('Match orders', () => {
        it('should match two orders and create an event', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            //CHECK FOR EVENT
            response.externals.forEach(e => {
                const event = loadMatchEvent(e.body.asSlice());
                expect(event.pair.buy_order_id).toBe(2n);
                expect(event.pair.sell_order_id).toBe(1n);
                expect(event.pair.pair_id).toBe(1n);
                expect(event.pair.completed).toBe(false);
            });
        });
        it('should match with the oldest order', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        timestamp: BigInt(Date.now()),
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        is_buy: false,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        timestamp: BigInt(Date.now()) + 100n,
                        is_paired: false
                    }
                }
            );
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 3n,
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        timestamp: BigInt(Date.now()) + 100n,
                        is_paired: false
                    }
                }
            );
            response.externals.forEach(e => {
                const event = loadMatchEvent(e.body.asSlice());
                expect(event.pair.buy_order_id).toBe(3n);
                expect(event.pair.sell_order_id).toBe(1n);
                expect(event.pair.pair_id).toBe(1n);
                expect(event.pair.completed).toBe(false);
            });
        });
        it('should not match orders with different `amount`', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 101n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            expect(response.externals.length).toBe(0);
        });
        it('should not match orders with the same `is_buy`', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: true,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            expect(response.externals.length).toBe(0);
        });
        it('should not match orders with the different `price`', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 200n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            expect(response.externals.length).toBe(0);
        });
        it('should not match when `is_paired` equals true', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: true
                    }
                }
            );
            const user = await blockchain.treasury('user');
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            expect(response.externals.length).toBe(0);
        });
    });
    describe('Balance', () => {
        it('should return correct balance after deploy', async () => {
            const balance = await mainContract.getBalance();
            expect(parseFloat(balance)).toBeCloseTo(30);

        });
    });
    describe('Withdraw', () => {
        it('should withdraw correct sum when called by owner', async () => {
            const initialBalance = await deployer.getBalance();
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'Withdraw',
                    amount: toNano('10')
                }
            );
            const totalFees = response.transactions.reduce((acc, internalTx) => acc + internalTx.totalFees.coins, 0n);
            const currentBalance = parseFloat(fromNano(await deployer.getBalance()));
            const expectedBalance = parseFloat(fromNano(initialBalance + toNano(10) - totalFees));
            expect(currentBalance).toBeCloseTo(expectedBalance);
            expect(response.transactions).toHaveTransaction({
                from: deployer.address,
                to: mainContract.address,
                success: true
            });
        });
        it('should not withdraw when called not by owner', async () => {
            const user = await blockchain.treasury('user');
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'Withdraw',
                    amount: toNano('10')
                }
            );
            const contractBalance = await mainContract.getBalance();
            expect(parseFloat(contractBalance)).toBeCloseTo(30);
            expect(response.transactions).toHaveTransaction(
                {
                    from: user.address,
                    to: mainContract.address,
                    success: false,
                    exitCode: 27921
                }
            );
        });
        it('should always leave more than 10 TON when trying to withdraw sum that that is more than {ALL_BALANCE} - 10 TON', async () => {
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'Withdraw',
                    amount: toNano('25')
                }
            );
            const balance = parseFloat(await mainContract.getBalance());
            expect(balance).toBeCloseTo(10);
            expect(response.transactions).toHaveTransaction({
                from: deployer.address,
                to: mainContract.address,
                success: true
            });
        });
    });
    describe('Complete pair', () => {
        it('should update completed status in pair list', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CompletePair',
                    pair_id: 1n
                }
            );

            expect(response.transactions).toHaveTransaction({
                from: deployer.address,
                to: mainContract.address,
                success: true
            });
            const pair = await mainContract.getPair(1n);
            expect(pair?.completed).toBe(true);
        });
        it('should remove orders after completion from order_list', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            const response = await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CompletePair',
                    pair_id: 1n
                }
            );
            const buyOrder = await mainContract.getOrder(2n);
            const sellOrder = await mainContract.getOrder(1n);
            expect(buyOrder).toBeNull();
            expect(sellOrder).toBeNull();
            expect(response.transactions).toHaveTransaction({
                from: deployer.address,
                to: mainContract.address
            });
        });
        it('should not complete if called not by owner', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CompletePair',
                    pair_id: 1n
                }
            );
            const buyOrder = await mainContract.getOrder(2n);
            const sellOrder = await mainContract.getOrder(1n);
            expect(buyOrder).toBeDefined();
            expect(sellOrder).toBeDefined();
            expect(response.transactions).toHaveTransaction({
                from: user.address,
                to: mainContract.address,
                success: false
            });
        });
    });

    describe('Get list', () => {
        it('should get correct list', async () => {
            const mockTimestamp = BigInt(Date.now());
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: mockTimestamp,
                        id: 1n,
                        is_paired: false,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: mockTimestamp,
                        id: 2n,
                        is_paired: false,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n
                    }
                }
            );
            const orderList = await mainContract.getList(39n, 49n, false);
            expect(orderList.size).toEqual(2);
            expect(orderList.get(1n)?.id).toEqual(
                1n);
            expect(orderList.get(2n)?.id).toEqual(
                2n
            );
        });
    });
    describe('Get pair', () => {
        it('should get correct pair', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const user = await blockchain.treasury('user');
            const response = await mainContract.send(
                user.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        id: 2n,
                        timestamp: BigInt(Date.now()),
                        is_buy: true,
                        user_id: user.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 49n,
                        quote_token: 39n,
                        is_paired: false
                    }
                }
            );
            response.externals.forEach(e => {
                const event = loadMatchEvent(e.body.asSlice());
                expect(event.pair.buy_order_id).toBe(2n);
                expect(event.pair.sell_order_id).toBe(1n);
                expect(event.pair.pair_id).toBe(1n);
                expect(event.pair.completed).toBe(false);
            });
            const pair = await mainContract.getPair(1n);
            expect(pair).toBeDefined();
            expect(pair?.pair_id).toBe(1n);
        });

    });
    describe('Get Order', () => {
        it('should get correct order', async () => {
            await mainContract.send(
                deployer.getSender(),
                {
                    value: toNano('0.5')
                },
                {
                    $$type: 'CreateOrder',
                    order: {
                        $$type: 'Order',
                        timestamp: BigInt(Date.now()),
                        id: 1n,
                        is_buy: false,
                        user_id: deployer.address,
                        amount: 100n,
                        price: 100n,
                        base_token: 39n,
                        quote_token: 49n,
                        is_paired: false
                    }
                }
            );
            const order = await mainContract.getOrder(1n);
            expect(order).toBeDefined()
            expect(order?.id).toBe(1n)
            expect(await mainContract.getOrder(2n)).toBeNull()
        });
    });
});
