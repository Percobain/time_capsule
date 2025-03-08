use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("Message is still locked until timestamp {unlock_time}")]
    MessageLocked { unlock_time: u64 },
    
    #[error("No message found for this address")]
    NoMessageFound {},
}