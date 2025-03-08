use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Addr;

#[cw_serde]
pub struct InstantiateMsg {
    // Empty - no initialization parameters needed
}

#[cw_serde]
pub enum ExecuteMsg {
    // Store a new time capsule message
    StoreMessage { 
        message: String, 
        unlock_time: u64 
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    // Get a message if it's unlocked
    #[returns(MessageResponse)]
    GetMessage { owner: String },
}

// Response for the GetMessage query
#[cw_serde]
pub struct MessageResponse {
    pub message: String,
    pub owner: String,
    pub unlock_time: u64,
    pub is_unlocked: bool,
}