import "@stdlib/deploy";
import "@stdlib/ownable";
struct Order {
    //Unique id that comes from client
    id: Int as uint32;
    // Timestamp of the order
    timestamp: Int as uint64;
    // User address
    user_id: Address;
    // Token amount
    amount:Int as uint32;
    // Token price for 1
    price: Int as uint32;
    // is_buy flag that identifies, if it's sell or buy order
    is_buy: Bool;
    //  flag that identifies, is this order is available for pairing
    is_paired: Bool?;
    // Token client is trading
    base_token: Int as uint32;
    // Token client is acquiring
    quote_token:Int as uint32;
}
message CreateOrder {
    order: Order;
}
message RemoveOrder {
    order_id: Int as uint32;
}

struct Pair {
    pair_id:Int as uint32;
    buy_order_id: Int as uint32;
    sell_order_id:Int as uint32;
    completed: Bool?;
}

message MatchEvent {
    pair: Pair;
}
message Withdraw {
    amount: Int as uint64;
}
message ChangeOrderCount {
    new_max_count: Int as uint32;
}
message CompletePair {
    pair_id: Int as uint32;
}
contract Main with Ownable, Deployable {
    //Config
    // Min amount of ton to be left on the contract balance
    min_ton_for_storage:Int;
    max_orders_count: Int;
    // Ownable trait
    owner: Address;

    //MAPS
    // orders_map
    order_list: map<Int, Order>;
    // matched orders map
    pairs: map<Int, Pair>;

    // Increment value to store the matched pair id
    pair_id: Int as uint64;
    order_count: Int as uint64;

    init(owner: Address){
        self.owner = owner;
        self.pair_id = 0;
        self.order_count = 0;
        self.min_ton_for_storage = ton("10");
        self.max_orders_count = 10000;
    }
    // Function to add the order to the list
    fun orderList(order: Order) {
        require(self.order(order.id) == null, "Order already exist");
        self.order_list.set(order.id, order);
    }

    // Function to update the `is_paired` flag
    fun updatedPaired(order_id: Int){
        require(self.order_list.get(order_id) != null, "Order not found");
        let order: Order = self.order_list.get(order_id)!!;
        order.is_paired = true;
        self.order_list.set(order_id, order);
    }

    // Function to match the orders
    fun matchOrders(order: Order){
        let matches: map<Int, Order> = emptyMap();
        let matches_length = 0;
        let index = 0;
        foreach (k,v in self.order_list) {
            if(
            v.amount == order.amount
            &&
            v.base_token == order.quote_token
            &&
            v.quote_token == order.base_token
            &&
            v.amount * v.price == order.amount * order.price
            &&
            v.is_buy != order.is_buy
            &&
            v.is_paired == false
            ){
                matches.set(index, v);
                index+=1;
                matches_length+=1;
            }
        }
        if (matches_length > 0){
            require(matches.get(0) != null, "First element is missing");
            let first_order: Order = matches.get(0)!!;
            let min_time = first_order.timestamp;
            let chosen_id = first_order.id;
            foreach (k,v in matches){
                if(v.timestamp < min_time){
                    min_time = v.timestamp;
                    chosen_id = v.id;
                }
            }
            self.updatedPaired(chosen_id);
            self.updatedPaired(order.id);

            let buy_order_id = 0;
            let sell_order_id = 0;
            if(order.is_buy){
                buy_order_id = order.id;
                sell_order_id = chosen_id;
            } else {
                buy_order_id = chosen_id;
                sell_order_id = order.id;
            }
            self.pair_id+=1;
            let pair:Pair = Pair{
            pair_id: self.pair_id, buy_order_id: buy_order_id, sell_order_id: sell_order_id, completed: false};
            self.pairs.set(pair.pair_id, pair);
            emit(MatchEvent{
            pair :pair}.toCell());
        }
    }


    // Function to get the matches from the order list
    get fun list(base_token :Int, quote_token: Int, is_buy: Bool): map<Int, Order>{
        let matches: map<Int, Order> = emptyMap();
        let iterator = 1;
        foreach (k,v in self.order_list){
            if(v.base_token == base_token
            && v.quote_token == quote_token
            && v.is_buy == is_buy){
                matches.set(iterator, v);
                iterator+=1;
            }
        }
        return matches;
    }

    // Get pair by id
    get fun pair(id: Int): Pair? {
        return self.pairs.get(id);
    }

    // Get order by id
    get fun order(id: Int): Order? {
        return self.order_list.get(id);
    }
    // Get balance
    get fun balance(): String {
        return myBalance().toCoinsString();
    }
    //-- INTERNALS --
    //Withraw
    receive(msg: Withdraw) {
        require(sender() == self.owner, "Only owner is allowed to withdraw");
        let amount: Int = min(msg.amount, myBalance() - context().value - self.min_ton_for_storage);
        require(amount > 0, "Insufficient balance");
        send(SendParameters{
        to: self.owner,
        bounce: true,
        value: amount,
        mode: SendRemainingValue + SendIgnoreErrors
        });
    }
    //CREATE
    receive(msg: CreateOrder){
        require(self.order_count < self.max_orders_count, "Max order limit is exceeded");
        self.orderList(msg.order);
        self.order_count+=1;
        self.matchOrders(msg.order);
        self.reply("Refund gas excess".asComment());
    }
    //REMOVE
    receive(msg: RemoveOrder){
        require(self.order_list.get(msg.order_id) != null, "Order not found");
        let order: Order = self.order_list.get(msg.order_id)!!;
        require(sender() == self.owner || sender() == order.user_id,
        "Only owner or order creator is allowed to remove");
        self.order_list.set(msg.order_id, null);
        self.order_count-=1;
        self.reply("Refund gas excess".asComment());
    }
    // Change max_orders_count
    receive(msg: ChangeOrderCount){
        require(sender() == self.owner, "Only owner is allowed to withdraw");
        self.max_orders_count = msg.new_max_count;
        self.reply("Refund gas excess".asComment());
    }
    //COMPLETE
    receive(msg: CompletePair){
        require(sender() == self.owner, "Only owner is allowed to complete");
        require(self.pairs.get(msg.pair_id) != null, "Pair with such id not exist");
        let pair: Pair = self.pairs.get(msg.pair_id)!!;
        pair.completed = true;
        self.pairs.set(msg.pair_id, pair);
        self.order_list.set(pair.sell_order_id, null);
        self.order_list.set(pair.buy_order_id, null);
        self.reply("Refund gas excess".asComment());
    }
    // Receive funds
    receive(){}
}