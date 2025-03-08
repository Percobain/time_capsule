use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::Addr;
use cw_storage_plus::Map;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Capsule {
    pub owner: Addr,
    pub message: String,
    pub unlock_time: u64, // Timestamp when message can be accessed
}

// Store capsules by owner address
pub const CAPSULES: Map<&Addr, Capsule> = Map::new("capsules");