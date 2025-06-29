#!/usr/bin/env python3
"""Endpoint verification for TPIE v6.4 with confirmed working endpoints"""
import os
import requests

ENDPOINTS = [
    (f"https://mainnet.infura.io/v3/{os.getenv('INFURA_KEY', 'demo')}", "Infura RPC"),
    ("https://nova.arbitrum.io/rpc", "Arbitrum Nova RPC"),
    ("https://api.biconomy.io/health", "Biconomy Health"),
    ("https://base.blockscout.com/api/v2/gas-price-oracle", "Base Sequencer"),
    ("https://celestia-rpc.publicnode.com", "Celestia RPC"),
    ("https://avs.automata.network/api/v1/tasks", "Automata AVS"),
    ("https://ethgasstation.info/api/ethgasAPI.json", "ETH Gas Station"),
    ("https://relay.gelato.digital", "Gelato Relay"),
    ("https://bridge.orbiter.finance/api/routers", "Orbiter Bridge")
]

def verify_endpoint(url, name):
    try:
        # Special handling for different endpoints
        if "infura" in url:
            payload = {"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}
            response = requests.post(url, json=payload, timeout=10)
            return response.status_code == 200 and 'result' in response.json()
        
        elif "biconomy" in url:
            response = requests.get(url, timeout=10)
            return response.status_code == 200 and response.json().get("status") == "OK"
        
        elif "base" in url:
            response = requests.get(url, timeout=10)
            return response.status_code == 200 and "baseFeePerGas" in response.json()
        
        elif "celestia" in url:
            payload = {"jsonrpc": "2.0", "method": "status", "id": 1}
            response = requests.post(url, json=payload, timeout=10)
            return response.status_code == 200 and "result" in response.json()
        
        elif "automata" in url:
            response = requests.get(url, timeout=10)
            return response.status_code == 200 and isinstance(response.json(), list)
        
        else:
            response = requests.get(url, timeout=10)
            return response.status_code == 200
        
    except Exception as e:
        print(f"    Error: {str(e)[:100]}")
        return False

def verify_endpoints():
    print("Testing all required endpoints...\n")
    all_ok = True
    
    for url, name in ENDPOINTS:
        print(f"Testing {name} ({url})...")
        if verify_endpoint(url, name):
            print(f"✓ {name} operational")
        else:
            print(f"✗ {name} unavailable")
            all_ok = False
        print()
    
    print("\nVerification complete.")
    print("✓ All systems operational" if all_ok else "✗ Some services unavailable")
    return all_ok

if __name__ == "__main__":
    verify_endpoints()