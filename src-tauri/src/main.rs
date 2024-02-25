// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env, fs::File, io::Read};

use anyhow::Result;
use reqwest;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[tauri::command]
async fn get_schedule_data(handle: tauri::AppHandle) -> Result<String, String> {

    let resource_path = handle.path_resolver()
        .resolve_resource("src/resources/octranspo.conf")
        .expect("Failed to resolve resource");

    let p = resource_path.clone();

    // Get the config we need for schedule data
    let mut file = match File::open(resource_path) {
        Ok(file) => file,
        Err(e) => return Err(format!("{:?} {:?}", e, p)),
    };

    let mut msg: String = String::new();
    match file.read_to_string(&mut msg) {
        Ok(_) => (),
        _ => {
            return {
                Err("Failed to retrieve schedule: Could not read config file contents".to_string())
            }
        }
    }
    let config: OCTranspoConfig = serde_json::from_str(&msg).unwrap();
    let app_id = config.app_id;
    let api_key = config.api_key;

    let mut results: Vec<Value> = Vec::new();

    // //Send requests for each of the stop numbers in the config
    for stop_no in config.stop_numbers {
        let address = format!("https://api.octranspo1.com/v2.0/GetNextTripsForStopAllRoutes?appID={}&apiKey={}&stopNo={}",app_id, api_key, stop_no);

        let v = reqwest::get(address).await.unwrap().text().await.unwrap();
        let data: Value = serde_json::from_str(&v).unwrap();
        results.push(data);
    }

    let response = AllStopData { stops: results };

    return Ok(serde_json::to_string(&response).unwrap());
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_schedule_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Config file for all stops
#[derive(Deserialize, Serialize, Clone)]
pub(crate) struct OCTranspoConfig {
    app_id: String,
    api_key: String,
    stop_numbers: Vec<u32>,
}

#[derive(Deserialize, Serialize, Clone)]
pub(crate) struct AllStopData {
    stops: Vec<Value>,
}
