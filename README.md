# simple-counter

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

###  Contract description
# TACT Compilation Report
Contract: Main
BOC Size: 3081 bytes
# Error Codes
```
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
11596: Only owner or order creator is allowed to remove
18022: Max order limit is exceeded
18518: Order not found
19381: Pair with such id not exist
25124: First element is missing
27921: Only owner is allowed to withdraw
31808: Only owner is allowed to complete
34536: Order already exist
54615: insufficient balance`
```
# Types
Total Types: 16

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Order
TLB: `_ id:uint32 timestamp:uint64 user_id:address amount:uint32 price:uint32 is_buy:bool is_paired:Maybe bool base_token:uint32 quote_token:uint32 = Order`
Signature: `Order{id:uint32,timestamp:uint64,user_id:address,amount:uint32,price:uint32,is_buy:bool,is_paired:Maybe bool,base_token:uint32,quote_token:uint32}`

## CreateOrder
TLB: `create_order#b0128d23 order:Order{id:uint32,timestamp:uint64,user_id:address,amount:uint32,price:uint32,is_buy:bool,is_paired:Maybe bool,base_token:uint32,quote_token:uint32} = CreateOrder`
Signature: `CreateOrder{order:Order{id:uint32,timestamp:uint64,user_id:address,amount:uint32,price:uint32,is_buy:bool,is_paired:Maybe bool,base_token:uint32,quote_token:uint32}}`

## RemoveOrder
TLB: `remove_order#a81dbc5d order_id:uint32 = RemoveOrder`
Signature: `RemoveOrder{order_id:uint32}`

## Pair
TLB: `_ pair_id:uint32 buy_order_id:uint32 sell_order_id:uint32 completed:Maybe bool = Pair`
Signature: `Pair{pair_id:uint32,buy_order_id:uint32,sell_order_id:uint32,completed:Maybe bool}`

## MatchEvent
TLB: `match_event#eb0b5669 pair:Pair{pair_id:uint32,buy_order_id:uint32,sell_order_id:uint32,completed:Maybe bool} = MatchEvent`
Signature: `MatchEvent{pair:Pair{pair_id:uint32,buy_order_id:uint32,sell_order_id:uint32,completed:Maybe bool}}`

## Withdraw
TLB: `withdraw#94cc7430 amount:uint64 = Withdraw`
Signature: `Withdraw{amount:uint64}`

## ChangeOrderCount
TLB: `change_order_count#2cea1e54 new_max_count:uint32 = ChangeOrderCount`
Signature: `ChangeOrderCount{new_max_count:uint32}`

## CompletePair
TLB: `complete_pair#4f475d35 pair_id:uint32 = CompletePair`
Signature: `CompletePair{pair_id:uint32}`

# Get Methods
Total Get Methods: 5

## list
Argument: base_token
Argument: quote_token
Argument: is_buy

## pair
Argument: id

## order
Argument: id

## balance

## owner

