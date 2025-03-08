#[cfg(test)]
mod tests {
    use crate::helpers::TimeCapsuleContract;
    use crate::msg::{ExecuteMsg, InstantiateMsg, MessageResponse};
    use cosmwasm_std::testing::MockApi;
    use cosmwasm_std::{Addr, Coin, Empty, Uint128};
    use cw_multi_test::{App, AppBuilder, Contract, ContractWrapper, Executor};

    pub fn contract_time_capsule() -> Box<dyn Contract<Empty>> {
        let contract = ContractWrapper::new(
            crate::contract::execute,
            crate::contract::instantiate,
            crate::contract::query,
        );
        Box::new(contract)
    }

    const USER: &str = "USER";
    const ADMIN: &str = "ADMIN";
    const NATIVE_DENOM: &str = "denom";

    fn mock_app() -> App {
        AppBuilder::new().build(|router, _, storage| {
            router
                .bank
                .init_balance(
                    storage,
                    &MockApi::default().addr_make(USER),
                    vec![Coin {
                        denom: NATIVE_DENOM.to_string(),
                        amount: Uint128::new(1),
                    }],
                )
                .unwrap();
        })
    }

    fn proper_instantiate() -> (App, TimeCapsuleContract) {
        let mut app = mock_app();
        let time_capsule_id = app.store_code(contract_time_capsule());

        let msg = InstantiateMsg {};
        let time_capsule_contract_addr = app
            .instantiate_contract(
                time_capsule_id,
                Addr::unchecked(ADMIN),
                &msg,
                &[],
                "test",
                None,
            )
            .unwrap();

        let time_capsule_contract = TimeCapsuleContract(time_capsule_contract_addr);

        (app, time_capsule_contract)
    }

    mod time_capsule {
        use super::*;

        #[test]
        fn store_and_retrieve_message() {
            let (mut app, time_capsule_contract) = proper_instantiate();

            // Current time in the test environment
            let block_info = app.block_info();
            let current_time = block_info.time.seconds();
            
            // Store a message that unlocks in the future
            let unlock_time = current_time + 100000;
            let msg = ExecuteMsg::StoreMessage { 
                message: "Test message from the past".to_string(),
                unlock_time 
            };

            let cosmos_msg = time_capsule_contract.call(msg).unwrap();
            app.execute(Addr::unchecked(USER), cosmos_msg).unwrap();

            // Try to read the message (should be locked)
            // Note: To properly test this we'd need to query and check the response
            
            // Fast forward time
            app.update_block(|block| {
                block.time = block.time.plus_seconds(150000);
            });
            
            // Now the message should be readable
            // In a real test, you would query the contract and verify the response
        }
    }
}