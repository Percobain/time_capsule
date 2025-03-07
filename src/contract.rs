#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Addr};
use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, MessageResponse, QueryMsg};
use crate::state::{CAPSULES, Capsule};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:time_capsule";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::StoreMessage { message, unlock_time } => {
            execute_store_message(deps, env, info, message, unlock_time)
        }
    }
}

pub fn execute_store_message(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    message: String,
    unlock_time: u64,
) -> Result<Response, ContractError> {
    let capsule = Capsule {
        owner: info.sender.clone(),
        message,
        unlock_time,
    };

    // Save the time capsule
    CAPSULES.save(deps.storage, &info.sender, &capsule)?;

    Ok(Response::new()
        .add_attribute("action", "store_message")
        .add_attribute("owner", info.sender))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetMessage { owner } => {
            to_json_binary(&query_get_message(deps, env, owner)?)
        }
    }
}

fn query_get_message(deps: Deps, env: Env, owner: String) -> StdResult<MessageResponse> {
    let owner_addr = deps.api.addr_validate(&owner)?;
    let capsule = CAPSULES.load(deps.storage, &owner_addr)?;
    
    // Check if the message is unlocked
    let is_unlocked = env.block.time.seconds() >= capsule.unlock_time;
    
    // If it's not unlocked, don't reveal the message
    let message = if is_unlocked {
        capsule.message
    } else {
        "This message is still locked.".to_string()
    };

    Ok(MessageResponse {
        message,
        owner,
        unlock_time: capsule.unlock_time,
        is_unlocked,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, MessageInfo, from_json};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies();
        let env = mock_env();
        let info = MessageInfo {
            sender: Addr::unchecked("creator"),
            funds: coins(1000, "earth"),
        };
        let msg = InstantiateMsg {};
        
        // we can just call .unwrap() to assert this was a success
        let res = instantiate(deps.as_mut(), env, info, msg).unwrap();
        assert_eq!(0, res.messages.len());
    }

    #[test]
    fn store_and_retrieve_message() {
        let mut deps = mock_dependencies();
        let env = mock_env();
        
        // Instantiate the contract
        let msg = InstantiateMsg {};
        let info = MessageInfo {
            sender: Addr::unchecked("creator"),
            funds: coins(1000, "earth"),
        };
        let _res = instantiate(deps.as_mut(), env.clone(), info, msg).unwrap();
        
        // Store a message with future unlock time (1 day in future)
        let future_time = env.block.time.seconds() + 86400;
        let msg = ExecuteMsg::StoreMessage {
            message: "Hello from the past!".to_string(),
            unlock_time: future_time,
        };
        let info = MessageInfo {
            sender: Addr::unchecked("alice"),
            funds: coins(2, "token"),
        };
        let _res = execute(deps.as_mut(), env.clone(), info, msg).unwrap();
        
        // Try to retrieve the message (should be locked)
        let res = query(
            deps.as_ref(),
            env.clone(),
            QueryMsg::GetMessage {
                owner: "alice".to_string(),
            },
        )
        .unwrap();
        let message_response: MessageResponse = from_json(&res).unwrap();
        assert_eq!(message_response.message, "This message is still locked.");
        assert_eq!(message_response.is_unlocked, false);
        
        // Now let's advance time to unlock the message
        let mut env_future = mock_env();
        env_future.block.time = env_future.block.time.plus_seconds(100000); // Far in future
        
        // Retrieve the message again (should be unlocked)
        let res = query(
            deps.as_ref(),
            env_future,
            QueryMsg::GetMessage {
                owner: "alice".to_string(),
            },
        )
        .unwrap();
        let message_response: MessageResponse = from_json(&res).unwrap();
        assert_eq!(message_response.message, "Hello from the past!");
        assert_eq!(message_response.is_unlocked, true);
    }
}